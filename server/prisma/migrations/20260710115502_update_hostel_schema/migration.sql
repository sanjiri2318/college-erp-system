/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Hostel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Hostel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Hostel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wardenName` to the `Hostel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wardenPhone` to the `Hostel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hostel` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `wardenName` VARCHAR(191) NOT NULL,
    ADD COLUMN `wardenPhone` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Hostel_code_key` ON `Hostel`(`code`);
