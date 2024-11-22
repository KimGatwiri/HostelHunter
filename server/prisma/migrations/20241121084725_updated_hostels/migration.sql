/*
  Warnings:

  - You are about to drop the column `userId` on the `hostels` table. All the data in the column will be lost.
  - Added the required column `owner` to the `hostels` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "hostels" DROP CONSTRAINT "hostels_id_fkey";

-- AlterTable
ALTER TABLE "hostels" DROP COLUMN "userId",
ADD COLUMN     "owner" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "hostels" ADD CONSTRAINT "hostels_owner_fkey" FOREIGN KEY ("owner") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
