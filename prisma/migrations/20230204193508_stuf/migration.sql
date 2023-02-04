/*
  Warnings:

  - Added the required column `lat` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "lat" INTEGER NOT NULL,
ADD COLUMN     "long" INTEGER NOT NULL;
