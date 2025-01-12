import { describe, it, expect, jest } from '@jest/globals';
import request from 'supertest';
import { app, prisma } from '../../src/index';

describe('GET /hello', () => {
   it('should return the hello world message from the database', async () => {
      const mockFindFirst = jest
         .spyOn(prisma.demo, 'findFirst')
         .mockResolvedValue({
            id: '1',
            message: 'Hello world from database',
         });

      const response = await request(app).get('/hello');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Hello world from database');
      expect(response.body.data).toEqual({
         id: '1',
         message: 'Hello world from database',
      });

      mockFindFirst.mockRestore();
   });

   it('should return a default message when no message is found in the database', async () => {
      const mockFindFirst = jest
         .spyOn(prisma.demo, 'findFirst')
         .mockResolvedValue(null);

      const response = await request(app).get('/hello');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
         "Message from db doesn't came please check once",
      );
      expect(response.body.data).toBeNull();

      mockFindFirst.mockRestore();
   });
});
