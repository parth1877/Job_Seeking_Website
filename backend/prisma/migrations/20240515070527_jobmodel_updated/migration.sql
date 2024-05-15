/*
  Warnings:

  - You are about to drop the column `descrption` on the `Job` table. All the data in the column will be lost.
  - Added the required column `description` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "descrption",
ADD COLUMN     "description" VARCHAR(255) NOT NULL;
