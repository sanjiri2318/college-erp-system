-- CreateTable
CREATE TABLE `TransportRoute` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `routeName` VARCHAR(191) NOT NULL,
    `routeCode` VARCHAR(191) NOT NULL,
    `startLocation` VARCHAR(191) NOT NULL,
    `endLocation` VARCHAR(191) NOT NULL,
    `distance` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TransportRoute_routeCode_key`(`routeCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransportStop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stopName` VARCHAR(191) NOT NULL,
    `stopOrder` INTEGER NOT NULL,
    `routeId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TransportStop_routeId_stopOrder_key`(`routeId`, `stopOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransportBus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `busNumber` VARCHAR(191) NOT NULL,
    `vehicleType` ENUM('BUS', 'VAN') NOT NULL,
    `capacity` INTEGER NOT NULL,
    `driverName` VARCHAR(191) NOT NULL,
    `driverPhone` VARCHAR(191) NOT NULL,
    `routeId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TransportBus_busNumber_key`(`busNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentTransport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `busId` INTEGER NOT NULL,
    `stopId` INTEGER NOT NULL,
    `allocatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `StudentTransport_studentId_key`(`studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TransportStop` ADD CONSTRAINT `TransportStop_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `TransportRoute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransportBus` ADD CONSTRAINT `TransportBus_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `TransportRoute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentTransport` ADD CONSTRAINT `StudentTransport_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentTransport` ADD CONSTRAINT `StudentTransport_busId_fkey` FOREIGN KEY (`busId`) REFERENCES `TransportBus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentTransport` ADD CONSTRAINT `StudentTransport_stopId_fkey` FOREIGN KEY (`stopId`) REFERENCES `TransportStop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
