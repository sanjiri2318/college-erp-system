-- AlterTable
ALTER TABLE `student` ADD COLUMN `gender` ENUM('MALE', 'FEMALE') NULL;

-- CreateTable
CREATE TABLE `Hostel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('BOYS', 'GIRLS') NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HostelBlock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `hostelId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HostelRoom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomNumber` VARCHAR(191) NOT NULL,
    `floor` INTEGER NOT NULL,
    `capacity` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `hostelBlockId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `HostelRoom_hostelBlockId_roomNumber_key`(`hostelBlockId`, `roomNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HostelBed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bedNo` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `hostelRoomId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `HostelBed_hostelRoomId_bedNo_key`(`hostelRoomId`, `bedNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HostelAllocation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `hostelBedId` INTEGER NOT NULL,
    `allocatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `HostelAllocation_studentId_key`(`studentId`),
    UNIQUE INDEX `HostelAllocation_hostelBedId_key`(`hostelBedId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HostelBlock` ADD CONSTRAINT `HostelBlock_hostelId_fkey` FOREIGN KEY (`hostelId`) REFERENCES `Hostel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HostelRoom` ADD CONSTRAINT `HostelRoom_hostelBlockId_fkey` FOREIGN KEY (`hostelBlockId`) REFERENCES `HostelBlock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HostelBed` ADD CONSTRAINT `HostelBed_hostelRoomId_fkey` FOREIGN KEY (`hostelRoomId`) REFERENCES `HostelRoom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HostelAllocation` ADD CONSTRAINT `HostelAllocation_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HostelAllocation` ADD CONSTRAINT `HostelAllocation_hostelBedId_fkey` FOREIGN KEY (`hostelBedId`) REFERENCES `HostelBed`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
