-- AlterTable
ALTER TABLE `Banner` ADD COLUMN `index` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `used` BOOLEAN NOT NULL DEFAULT true;