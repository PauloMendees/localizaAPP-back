-- AlterTable
ALTER TABLE `auth_user` ADD COLUMN `empresa_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `item` ADD COLUMN `empresa_id` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `empresa` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `auth_user` ADD CONSTRAINT `auth_user_empresa_id_fkey` FOREIGN KEY (`empresa_id`) REFERENCES `empresa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_empresa_id_fkey` FOREIGN KEY (`empresa_id`) REFERENCES `empresa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
