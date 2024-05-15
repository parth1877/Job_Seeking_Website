-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "descrption" VARCHAR(255) NOT NULL,
    "category" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "loacation" TEXT NOT NULL,
    "fixedSalary" INTEGER NOT NULL,
    "salaryFrom" INTEGER NOT NULL,
    "salaryTo" INTEGER NOT NULL,
    "expired" BOOLEAN NOT NULL DEFAULT false,
    "jobPostedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
