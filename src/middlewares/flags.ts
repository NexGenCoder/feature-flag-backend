import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

const errorMessages = {
   name: {
      'string.empty': 'Flag name cannot be empty',
      'any.required': 'Flag name is required',
   },
   description: {
      'string.empty': 'Description cannot be empty if provided',
   },
   key: {
      'string.empty': 'Flag key cannot be empty',
      'any.required': 'Flag key is required',
   },
   project_id: {
      'string.empty': 'Project ID cannot be empty',
      'any.required': 'Project ID is required',
   },
   environment_id: {
      'string.empty': 'Environment ID cannot be empty',
      'any.required': 'Environment ID is required',
   },
   is_active: {
      'boolean.base': 'Is active must be a boolean value',
      'any.required': 'Is active status is required',
   },
   expires_at: {
      'date.base': 'Expiration date must be a valid date',
      'date.greater': 'Expiration date must be in the future',
   },
   added_by: {
      'string.empty': 'Added by cannot be empty',
      'any.required': 'Added by is required',
   },
};

export const createFlagValidator = Joi.object({
   name: Joi.string()
      .trim()
      .min(3)
      .max(100)
      .required()
      .messages(errorMessages.name),

   description: Joi.string()
      .trim()
      .max(500)
      .allow('')
      .optional()
      .messages(errorMessages.description),

   key: Joi.string()
      .trim()
      .pattern(/^[a-zA-Z0-9_-]+$/)
      .min(3)
      .max(50)
      .required()
      .messages({
         ...errorMessages.key,
         'string.pattern.base':
            'Flag key must contain only letters, numbers, hyphens and underscores',
      }),

   project_id: Joi.string()
      .trim()
      .uuid()
      .required()
      .messages({
         ...errorMessages.project_id,
         'string.guid': 'Project ID must be a valid UUID',
      }),

   environment_id: Joi.string()
      .trim()
      .uuid()
      .required()
      .messages({
         ...errorMessages.environment_id,
         'string.guid': 'Environment ID must be a valid UUID',
      }),

   is_active: Joi.boolean().required().messages(errorMessages.is_active),

   expires_at: Joi.date()
      .greater('now')
      .allow(null)
      .optional()
      .messages({
         ...errorMessages.expires_at,
         'date.greater': 'Expiration date must be in the future',
      }),

   added_by: Joi.string()
      .trim()
      .uuid()
      .required()
      .messages({
         ...errorMessages.added_by,
         'string.guid': 'Added by must be a valid UUID',
      }),
});

export const validateCreateFlag = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   try {
      await createFlagValidator.validateAsync(req.body);
      next();
   } catch (error: unknown) {
      if (error instanceof Error) {
         res.status(400).json({ error: error.message });
      } else {
         res.status(400).json({ error: 'An unknown error occurred' });
      }
   }
};
