-- CreateTable
CREATE TABLE `BookCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BookCategory_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Author` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Publisher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Book` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `isbn` VARCHAR(191) NOT NULL,
    `edition` VARCHAR(191) NULL,
    `language` VARCHAR(191) NULL,
    `price` DOUBLE NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `authorId` INTEGER NOT NULL,
    `publisherId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Book_isbn_key`(`isbn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookCopy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `barcode` VARCHAR(191) NOT NULL,
    `shelfNo` VARCHAR(191) NULL,
    `status` ENUM('AVAILABLE', 'ISSUED', 'LOST', 'DAMAGED') NOT NULL DEFAULT 'AVAILABLE',
    `purchaseDate` DATETIME(3) NULL,
    `bookId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BookCopy_barcode_key`(`barcode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookIssue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `bookCopyId` INTEGER NOT NULL,
    `issueDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dueDate` DATETIME(3) NOT NULL,
    `returnDate` DATETIME(3) NULL,
    `fine` DOUBLE NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `BookCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Author`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_publisherId_fkey` FOREIGN KEY (`publisherId`) REFERENCES `Publisher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookCopy` ADD CONSTRAINT `BookCopy_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookIssue` ADD CONSTRAINT `BookIssue_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookIssue` ADD CONSTRAINT `BookIssue_bookCopyId_fkey` FOREIGN KEY (`bookCopyId`) REFERENCES `BookCopy`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
