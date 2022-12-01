import { PrismaClient } from '@prisma/client';
import { FastifyRequest } from 'fastify';

import prisma from '../database';

import { verifyToken } from '../utils/auth';

export type GraphQLContext = {
  prisma: PrismaClient;
  userId: string | undefined;
  token: string | undefined;
};

export async function contextFactory(
  request: FastifyRequest,
): Promise<GraphQLContext> {
  const token = (request.headers as any)['authorization'];
  const userId = await verifyToken(prisma, token);

  return {
    prisma,
    userId,
    token,
  };
}
