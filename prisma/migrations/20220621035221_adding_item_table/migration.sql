-- CreateTable
CREATE TABLE `item` (
    `id` VARCHAR(191) NOT NULL,
    `plaqueta` VARCHAR(191) NOT NULL,
    `sequencial_localiza` VARCHAR(191) NOT NULL,
    `andar` VARCHAR(191) NOT NULL,
    `localizacao` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `lido` VARCHAR(191) NOT NULL,
    `data_inclusao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tipo` VARCHAR(191) NOT NULL,
    `foto_url` VARCHAR(191) NOT NULL,
    `dono` VARCHAR(191) NOT NULL,
    `codigo_de_barras` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
