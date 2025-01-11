import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const port = 3000;
const app = express();
const prisma = new PrismaClient();

app.get("/hello", async (req: Request, res: Response) => {
  const helloWorldMessageFromDB = await prisma.demo.findFirst({
    where: {
      message: "Hello world from database",
    },
  });

  res.json({
    message:
      helloWorldMessageFromDB?.message ||
      "Message from db doesn't came please check once",
    data: helloWorldMessageFromDB,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
