import { prisma } from '@getlicensed/db/src';

export function useDB() {
  return prisma;
}
