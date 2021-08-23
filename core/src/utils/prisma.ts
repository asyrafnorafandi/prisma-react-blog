import { PrismaClient } from '@prisma/client';

/**
 * Initialize in separate file to avoid multiple instances
 */
export default new PrismaClient();
