/*
  Warnings:

  - You are about to drop the column `vip` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `price` DOUBLE NULL,
    MODIFY `intro` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `tea` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `vip`,
    ADD COLUMN `tel` VARCHAR(191) NULL;
