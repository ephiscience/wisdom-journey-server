/*
  Warnings:

  - Added the required column `icon` to the `Criterion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Criterion" ADD COLUMN     "icon" TEXT NOT NULL;