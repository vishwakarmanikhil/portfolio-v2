import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// One Prisma client per server instance (reused across hot reloads in dev).
// Uses the pooled Neon URL (DATABASE_URL) through the node-postgres adapter.
// Created lazily, so builds don't need the database.
const globalForPrisma = globalThis;

export function getPrisma() {
    if (!globalForPrisma.__prisma) {
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) throw new Error('DATABASE_URL is not set');
        const adapter = new PrismaPg({ connectionString, max: 5 });
        globalForPrisma.__prisma = new PrismaClient({ adapter });
    }
    return globalForPrisma.__prisma;
}
