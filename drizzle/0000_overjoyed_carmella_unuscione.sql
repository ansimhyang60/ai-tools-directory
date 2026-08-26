CREATE TABLE `archive_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` enum('contest','grant','exhibition','news','case-study') NOT NULL,
	`title` varchar(500) NOT NULL,
	`summary` text NOT NULL,
	`organization` varchar(255),
	`sourceDomain` varchar(255) NOT NULL,
	`sourceUrl` text NOT NULL,
	`publishedAt` timestamp,
	`eventStartAt` timestamp,
	`eventEndAt` timestamp,
	`deadlineAt` timestamp,
	`status` enum('upcoming','open','closed','ongoing','unknown') NOT NULL DEFAULT 'unknown',
	`tags` text,
	`contentHash` varchar(64) NOT NULL,
	`lastSeenAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `archive_items_id` PRIMARY KEY(`id`),
	CONSTRAINT `archive_items_contentHash_unique` UNIQUE(`contentHash`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
CREATE INDEX `archive_items_type_idx` ON `archive_items` (`type`);--> statement-breakpoint
CREATE INDEX `archive_items_status_idx` ON `archive_items` (`status`);--> statement-breakpoint
CREATE INDEX `archive_items_published_idx` ON `archive_items` (`publishedAt`);--> statement-breakpoint
CREATE INDEX `archive_items_deadline_idx` ON `archive_items` (`deadlineAt`);