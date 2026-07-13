-- CreateTable
CREATE TABLE `FeeCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `FeeCategory_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FeeStructure` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `feeType` ENUM('TUITION', 'HOSTEL', 'TRANSPORT', 'EXAM', 'LIBRARY', 'OTHER') NOT NULL,
    `amount` DOUBLE NOT NULL,
    `semester` INTEGER NOT NULL,
    `departmentId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `FeeStructure_departmentId_semester_feeType_key`(`departmentId`, `semester`, `feeType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentFee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `feeStructureId` INTEGER NOT NULL,
    `totalAmount` DOUBLE NOT NULL,
    `paidAmount` DOUBLE NOT NULL DEFAULT 0,
    `dueAmount` DOUBLE NOT NULL,
    `status` ENUM('PENDING', 'PARTIAL', 'PAID') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `StudentFee_studentId_feeStructureId_key`(`studentId`, `feeStructureId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FeePayment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `receiptNo` VARCHAR(191) NOT NULL,
    `studentFeeId` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `paymentMode` ENUM('CASH', 'UPI', 'CARD', 'NET_BANKING') NOT NULL,
    `transactionId` VARCHAR(191) NULL,
    `remarks` VARCHAR(191) NULL,
    `paidAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `FeePayment_receiptNo_key`(`receiptNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FeeStructure` ADD CONSTRAINT `FeeStructure_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeeStructure` ADD CONSTRAINT `FeeStructure_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `FeeCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentFee` ADD CONSTRAINT `StudentFee_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentFee` ADD CONSTRAINT `StudentFee_feeStructureId_fkey` FOREIGN KEY (`feeStructureId`) REFERENCES `FeeStructure`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeePayment` ADD CONSTRAINT `FeePayment_studentFeeId_fkey` FOREIGN KEY (`studentFeeId`) REFERENCES `StudentFee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
