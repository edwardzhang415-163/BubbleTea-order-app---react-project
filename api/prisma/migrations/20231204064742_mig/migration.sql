/*
  Warnings:

  - You are about to alter the column `price` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `price` on the `tea` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `tea` MODIFY `price` DOUBLE NOT NULL;
