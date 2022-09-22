import { PrismaClient } from '@prisma/client';
import { FastifyRequest } from 'fastify';
import { Novu } from '@novu/node';

import prisma from '../database';

export type GraphQLContext = {
  novu: Novu;
  prisma: PrismaClient;
  admin: any;
  token: string | null;
};

export async function contextFactory(
  request: FastifyRequest,
  novu: Novu,
): Promise<GraphQLContext> {
  const token: string = (request.headers as any)['authorization'];

  return {
    novu,
    prisma,
    admin: '',
    token,
  };
}
