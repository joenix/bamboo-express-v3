-- DropForeignKey
ALTER TABLE `Role` DROP FOREIGN KEY `Role_permissionId_fkey`;

-- AlterTable
ALTER TABLE `Role` MODIFY `permissionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permission`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
