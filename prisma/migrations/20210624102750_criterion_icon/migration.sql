/*
  Warnings:

  - Added the required column `icon` to the `CriterionTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CriterionTranslation" ADD COLUMN     "icon" TEXT NOT NULL;
