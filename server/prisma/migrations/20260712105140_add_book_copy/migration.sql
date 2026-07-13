/*
  Warnings:

  - You are about to drop the column `shelfNo` on the `bookcopy` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accessionNumber]` on the table `BookCopy` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessionNumber` to the `BookCopy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bookcopy` DROP FOREIGN KEY `BookCopy_bookId_fkey`;

-- DropIndex
DROP INDEX `BookCopy_bookId_fkey` ON `bookcopy`;

-- AlterTable
ALTER TABLE `bookcopy` DROP COLUMN `shelfNo`,
    ADD COLUMN `accessionNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `purchasePrice` DOUBLE NULL,
    ADD COLUMN `rackNumber` VARCHAR(191) NULL,
    ADD COLUMN `remarks` VARCHAR(191) NULL,
    ADD COLUMN `shelfNumber` VARCHAR(191) NULL,
    MODIFY `status` ENUM('AVAILABLE', 'ISSUED', 'RESERVED', 'LOST', 'DAMAGED') NOT NULL DEFAULT 'AVAILABLE';

-- CreateIndex
CREATE UNIQUE INDEX `BookCopy_accessionNumber_key` ON `BookCopy`(`accessionNumber`);

-- AddForeignKey
ALTER TABLE `BookCopy` ADD CONSTRAINT `BookCopy_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
