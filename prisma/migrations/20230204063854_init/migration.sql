/*
  Warnings:

  - Added the required column `jobName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "jobName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Job" (
    "value" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("value")
);

-- CreateTable
CREATE TABLE "Hobby" (
    "value" TEXT NOT NULL,

    CONSTRAINT "Hobby_pkey" PRIMARY KEY ("value")
);

-- CreateTable
CREATE TABLE "HobbiesOnUser" (
    "userId" TEXT NOT NULL,
    "hobbyName" TEXT NOT NULL,

    CONSTRAINT "HobbiesOnUser_pkey" PRIMARY KEY ("hobbyName","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Job_value_key" ON "Job"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Hobby_value_key" ON "Hobby"("value");

-- AddForeignKey
ALTER TABLE "HobbiesOnUser" ADD CONSTRAINT "HobbiesOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HobbiesOnUser" ADD CONSTRAINT "HobbiesOnUser_hobbyName_fkey" FOREIGN KEY ("hobbyName") REFERENCES "Hobby"("value") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_jobName_fkey" FOREIGN KEY ("jobName") REFERENCES "Job"("value") ON DELETE RESTRICT ON UPDATE CASCADE;
