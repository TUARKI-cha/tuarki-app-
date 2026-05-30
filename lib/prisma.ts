import path from "path";

import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const dbPath = path
  .join(process.cwd(), "dev.db")
  .replace(/\\/g, "/");

console.log("USANDO BASE SQLITE:", dbPath);

const adapter = new PrismaBetterSqlite3({
  url: `file:${dbPath}`,
});

const globalForPrisma =
  globalThis as unknown as {
    prisma: PrismaClient | undefined;
  };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}