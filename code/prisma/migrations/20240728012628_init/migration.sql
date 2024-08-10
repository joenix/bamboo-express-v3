/*
  Warnings:

  - You are about to drop the column `country` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Teach` table. All the data in the column will be lost.
  - Added the required column `area` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `area` to the `Teach` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `School` DROP COLUMN `country`,
    ADD COLUMN `area` VARCHAR(191) NOT NULL,
    ADD COLUMN `content` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Teach` DROP COLUMN `country`,
    ADD COLUMN `area` VARCHAR(191) NOT NULL,
    ADD COLUMN `content` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Tips` MODIFY `video` VARCHAR(191) NULL;
