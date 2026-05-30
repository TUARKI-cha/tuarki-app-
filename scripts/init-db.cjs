const Database = require("better-sqlite3");

const db = new Database("dev.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS "Consultation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "specialistName" TEXT
  );

  CREATE TABLE IF NOT EXISTS "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "consultationId" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Message_consultationId_fkey"
      FOREIGN KEY ("consultationId")
      REFERENCES "Consultation" ("id")
      ON DELETE RESTRICT
      ON UPDATE CASCADE
  );

  CREATE TABLE IF NOT EXISTS "ConsultationFile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "consultationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ConsultationFile_consultationId_fkey"
      FOREIGN KEY ("consultationId")
      REFERENCES "Consultation" ("id")
      ON DELETE RESTRICT
      ON UPDATE CASCADE
  );
`);

const tables = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table'")
  .all();

console.log("Tablas creadas:");
console.table(tables);