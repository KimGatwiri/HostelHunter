/*
  Warnings:

  - Added the required column `userId` to the `hostels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hostels" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "hostels" ADD CONSTRAINT "hostels_id_fkey" FOREIGN KEY ("id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
