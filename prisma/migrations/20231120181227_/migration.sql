-- AlterTable
ALTER TABLE `address` MODIFY `zipcode` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `book` MODIFY `bookImage` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user';
