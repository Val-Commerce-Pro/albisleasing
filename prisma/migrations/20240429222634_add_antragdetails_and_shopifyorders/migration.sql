-- CreateTable
CREATE TABLE `AntragDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `antragnr` INTEGER NOT NULL,
    `complete` BOOLEAN NOT NULL,
    `status` INTEGER NOT NULL,
    `status_txt` VARCHAR(191) NOT NULL,
    `kaufpreis` DOUBLE NOT NULL,
    `eingegangen` VARCHAR(191) NOT NULL,
    `ln_name` VARCHAR(191) NOT NULL,
    `ln_telefon` VARCHAR(191) NULL,
    `ln_mobil` VARCHAR(191) NULL,
    `ln_email` VARCHAR(191) NOT NULL,
    `gf_name` VARCHAR(191) NOT NULL,
    `gf_vname` VARCHAR(191) NOT NULL,
    `lastCheckAt` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AntragDetails_antragnr_key`(`antragnr`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShopifyOrders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `draftOrderId` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `orderName` VARCHAR(191) NULL,
    `antragnr` INTEGER NOT NULL,

    UNIQUE INDEX `ShopifyOrders_draftOrderId_key`(`draftOrderId`),
    UNIQUE INDEX `ShopifyOrders_orderId_key`(`orderId`),
    UNIQUE INDEX `ShopifyOrders_antragnr_key`(`antragnr`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShopifyOrders` ADD CONSTRAINT `ShopifyOrders_antragnr_fkey` FOREIGN KEY (`antragnr`) REFERENCES `AntragDetails`(`antragnr`) ON DELETE RESTRICT ON UPDATE CASCADE;
