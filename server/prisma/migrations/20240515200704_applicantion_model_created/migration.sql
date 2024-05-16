-- CreateEnum
CREATE TYPE "employeerole" AS ENUM ('EMPLOYEE');

-- CreateEnum
CREATE TYPE "applicantRole" AS ENUM ('JOBSEEKER');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phoneNumber" SET DATA TYPE CHAR(10);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "email" TEXT NOT NULL,
    "coverLetter" VARCHAR(255) NOT NULL,
    "phone" CHAR(10) NOT NULL,
    "address" VARCHAR(50) NOT NULL,
    "resumePublicID" TEXT NOT NULL,
    "resumeUrl" TEXT NOT NULL,
    "applicantrole" "applicantRole" NOT NULL,
    "employeerole" "employeerole" NOT NULL,
    "applicantID" INTEGER NOT NULL,
    "employeeID" INTEGER NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);
