/*
  Warnings:

  - You are about to drop the column `homelat` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `homelon` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "homelat",
DROP COLUMN "homelon",
ADD COLUMN     "homeLat" DOUBLE PRECISION,
ADD COLUMN     "homeLon" DOUBLE PRECISION;
