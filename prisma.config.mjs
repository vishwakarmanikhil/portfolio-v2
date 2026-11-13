// Prisma CLI configuration (prisma generate / migrate).
// Loads .env.local for local development; on Vercel the variables come
// from the project settings. Migrations use the direct (unpooled) URL.
import { config } from 'dotenv';
import { defineConfig } from 'prisma/config';

config({ path: '.env.local' });
config();

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
    },
    datasource: {
        url: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL ?? '',
    },
});
