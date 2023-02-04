/*
  Warnings:

  - The primary key for the `Picture` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Picture_pkey" PRIMARY KEY ("id");
