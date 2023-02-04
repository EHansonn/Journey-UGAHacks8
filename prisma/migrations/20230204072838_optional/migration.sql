-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_jobName_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "jobName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_jobName_fkey" FOREIGN KEY ("jobName") REFERENCES "Job"("value") ON DELETE SET NULL ON UPDATE CASCADE;
