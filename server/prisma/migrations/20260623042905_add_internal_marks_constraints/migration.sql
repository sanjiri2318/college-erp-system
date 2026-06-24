/*
  Warnings:

  - A unique constraint covering the columns `[studentId,subjectId,internalNumber]` on the table `InternalMark` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `InternalMark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `internalmark` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `InternalMark_studentId_subjectId_internalNumber_key` ON `InternalMark`(`studentId`, `subjectId`, `internalNumber`);
