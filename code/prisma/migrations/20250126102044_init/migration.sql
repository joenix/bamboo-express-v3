/*
  Warnings:

  - Added the required column `age` to the `User_Info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth` to the `User_Info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `career` to the `User_Info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User_Info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User_Info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `User_Info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User_Info` ADD COLUMN `age` INTEGER NOT NULL,
    ADD COLUMN `birth` DATETIME(3) NOT NULL,
    ADD COLUMN `career` VARCHAR(191) NOT NULL,
    ADD COLUMN `gender` INTEGER NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `photo` VARCHAR(191) NOT NULL;
