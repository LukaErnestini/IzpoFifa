/*
  Warnings:

  - Added the required column `userId` to the `Gameday` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Gameday" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Player" ADD COLUMN     "userId" TEXT NOT NULL;
