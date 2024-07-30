-- AlterTable
ALTER TABLE `issue` ADD COLUMN `assignedUserId` VARCHAR(255) NULL,
    MODIFY `title` VARCHAR(250) NOT NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedUserId_fkey` FOREIGN KEY (`assignedUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
