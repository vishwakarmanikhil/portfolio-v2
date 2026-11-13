/*
  Warnings:

  - You are about to drop the column `budget` on the `Enquiry` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `Enquiry` table. All the data in the column will be lost.
  - You are about to drop the column `projectType` on the `Enquiry` table. All the data in the column will be lost.
  - Made the column `phone` on table `Enquiry` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Enquiry" DROP COLUMN "budget",
DROP COLUMN "company",
DROP COLUMN "projectType",
ADD COLUMN     "topic" TEXT,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "message" DROP NOT NULL;
