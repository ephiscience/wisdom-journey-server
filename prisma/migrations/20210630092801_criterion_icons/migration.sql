/*
  Warnings:

  - You are about to drop the column `icon` on the `CriterionTranslation` table. All the data in the column will be lost.
  - Added the required column `icon` to the `Criterion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Criterion" ADD COLUMN     "icon" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CriterionTranslation" DROP COLUMN "icon";
