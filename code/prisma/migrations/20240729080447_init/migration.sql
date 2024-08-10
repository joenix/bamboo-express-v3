-- AlterTable
ALTER TABLE `CreditHis` ADD COLUMN `delete` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `delete` BOOLEAN NOT NULL DEFAULT false;
