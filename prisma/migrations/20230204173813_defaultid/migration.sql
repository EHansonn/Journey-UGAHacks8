/*
  Warnings:

  - The primary key for the `Trip` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_tripId_fkey";

-- AlterTable
ALTER TABLE "Picture" ALTER COLUMN "tripId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Trip_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
