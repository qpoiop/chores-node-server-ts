/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `pms_authority` (
    `ma_idx` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `ug_idx` INTEGER UNSIGNED NOT NULL,
    `m_idx` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_menu_authority_menu1_idx`(`m_idx`),
    UNIQUE INDEX `ux_menu_authority_1`(`ug_idx`, `m_idx`),
    PRIMARY KEY (`ma_idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pms_menu` (
    `m_idx` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `mm_idx` INTEGER UNSIGNED NOT NULL,
    `m_id` VARCHAR(45) NOT NULL,
    `m_name` VARCHAR(60) NOT NULL,
    `m_order` INTEGER NOT NULL DEFAULT 99,
    `m_desc` VARCHAR(255) NULL,
    `m_delyn` ENUM('Y', 'N') NOT NULL DEFAULT 'N',
    `m_url` VARCHAR(255) NOT NULL,
    `m_popyn` ENUM('Y', 'N') NOT NULL DEFAULT 'N',

    UNIQUE INDEX `m_id_UNIQUE`(`m_id`),
    INDEX `menu3_FK1_idx`(`mm_idx`),
    PRIMARY KEY (`m_idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pms_menugroup` (
    `mm_idx` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `mm_id` VARCHAR(45) NOT NULL,
    `mm_name` VARCHAR(60) NOT NULL,
    `mm_order` INTEGER NOT NULL DEFAULT 99,
    `mm_desc` VARCHAR(255) NULL,
    `mm_delyn` ENUM('Y', 'N') NOT NULL DEFAULT 'N',
    `mm_url` VARCHAR(45) NOT NULL,
    `mm_topyn` ENUM('Y', 'N') NOT NULL DEFAULT 'N',

    UNIQUE INDEX `mm_id_UNIQUE`(`mm_id`),
    PRIMARY KEY (`mm_idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pms_player` (
    `pr_idx` INTEGER NOT NULL AUTO_INCREMENT,
    `t_idx` INTEGER NOT NULL,
    `cs_type` VARCHAR(10) NOT NULL,
    `pr_url` VARCHAR(255) NULL,
    `pr_key` VARCHAR(255) NULL,
    `pr_exdt` VARCHAR(255) NULL DEFAULT '0',
    `pr_drmlicenceurl` VARCHAR(255) NULL,
    `pr_drmurl` VARCHAR(255) NULL,
    `pr_waterurl` VARCHAR(255) NULL,
    `pr_drmkey` VARCHAR(255) NULL,
    `pr_solt` VARCHAR(45) NULL,

    PRIMARY KEY (`pr_idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pms_team` (
    `t_idx` INTEGER NOT NULL AUTO_INCREMENT,
    `t_name` VARCHAR(45) NOT NULL,
    `t_id` VARCHAR(16) NULL DEFAULT 'NULL',
    `t_delYn` ENUM('Y', 'N') NOT NULL DEFAULT 'N',
    `access_id` VARCHAR(255) NULL,
    `access_key` VARCHAR(255) NULL,

    PRIMARY KEY (`t_idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pms_team_group` (
    `cg_idx` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `ug_idx` INTEGER UNSIGNED NOT NULL,
    `t_idx` INTEGER NOT NULL,

    INDEX `fk_customer_has_group_customer1_idx`(`t_idx`),
    UNIQUE INDEX `ux_customer_has_group_1`(`ug_idx`, `t_idx`),
    PRIMARY KEY (`cg_idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pms_ugroup` (
    `ug_idx` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `ug_id` VARCHAR(45) NOT NULL,
    `ug_name` VARCHAR(45) NOT NULL,
    `ug_delyn` ENUM('Y', 'N') NOT NULL DEFAULT 'N',
    `ug_instm` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `ug_id_UNIQUE`(`ug_id`),
    PRIMARY KEY (`ug_idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pms_userhistory` (
    `eh_idx` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `e_idx` INTEGER UNSIGNED NOT NULL,
    `eh_instm` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `e_acttype` VARCHAR(2) NOT NULL,
    `e_acttxt` TEXT NOT NULL,
    `e_ip` VARCHAR(45) NOT NULL,

    INDEX `fk-employee_history-1`(`e_idx`),
    PRIMARY KEY (`eh_idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pms_users` (
    `e_idx` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `e_systemid` VARCHAR(16) NOT NULL,
    `e_id` VARCHAR(45) NOT NULL,
    `e_pw` VARCHAR(255) NOT NULL,
    `e_name` VARCHAR(16) NOT NULL,
    `e_email` VARCHAR(255) NOT NULL,
    `e_department` VARCHAR(45) NULL,
    `e_instm` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `e_actyn` ENUM('Y', 'N') NOT NULL DEFAULT 'N',
    `e_delyn` ENUM('Y', 'N') NOT NULL DEFAULT 'N',
    `t_idx` INTEGER NULL,

    UNIQUE INDEX `e_systemid_UNIQUE`(`e_systemid`),
    UNIQUE INDEX `e_id_UNIQUE`(`e_id`),
    UNIQUE INDEX `e_email_UNIQUE`(`e_email`),
    PRIMARY KEY (`e_idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pms_users_ugroup` (
    `eg_idx` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `e_idx` INTEGER UNSIGNED NOT NULL,
    `ug_idx` INTEGER UNSIGNED NOT NULL,

    INDEX `fk-employee-ugroup-2_idx`(`ug_idx`),
    UNIQUE INDEX `ux_user_has_ugroup_1`(`e_idx`, `ug_idx`),
    PRIMARY KEY (`eg_idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pms_authority` ADD CONSTRAINT `fk-menu-ugroup-1` FOREIGN KEY (`ug_idx`) REFERENCES `pms_ugroup`(`ug_idx`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pms_authority` ADD CONSTRAINT `fk_menu_authority_menu1` FOREIGN KEY (`m_idx`) REFERENCES `pms_menu`(`m_idx`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pms_menu` ADD CONSTRAINT `fk-menu_m-menu-1` FOREIGN KEY (`mm_idx`) REFERENCES `pms_menugroup`(`mm_idx`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pms_team_group` ADD CONSTRAINT `fk_team_has_group_team1` FOREIGN KEY (`t_idx`) REFERENCES `pms_team`(`t_idx`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pms_team_group` ADD CONSTRAINT `fk_team_has_group_ugroup1` FOREIGN KEY (`ug_idx`) REFERENCES `pms_ugroup`(`ug_idx`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pms_userhistory` ADD CONSTRAINT `fk-employee_history-1` FOREIGN KEY (`e_idx`) REFERENCES `pms_users`(`e_idx`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pms_users_ugroup` ADD CONSTRAINT `fk-employee-ugroup-1` FOREIGN KEY (`e_idx`) REFERENCES `pms_users`(`e_idx`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pms_users_ugroup` ADD CONSTRAINT `fk-employee-ugroup-2` FOREIGN KEY (`ug_idx`) REFERENCES `pms_ugroup`(`ug_idx`) ON DELETE CASCADE ON UPDATE CASCADE;
