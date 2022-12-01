import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = async (
  prisma: PrismaClient,
  token: string | undefined,
): Promise<string | undefined> => {
  if (!token) {
    return undefined;
  }

  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET!);

  // Get the userId from the decoded token.
  //@ts-ignore
  const userId: string | undefined = decodedToken?.userId;

  return userId;
};
