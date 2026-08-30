CREATE TABLE `content_comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`contentType` enum('tool','skill','workflow','ui-guide','k-skill') NOT NULL,
	`contentKey` varchar(180) NOT NULL,
	`body` varchar(2000) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `content_comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `content_comments_content_idx` ON `content_comments` (`contentType`,`contentKey`,`createdAt`);--> statement-breakpoint
CREATE INDEX `content_comments_user_idx` ON `content_comments` (`userId`);