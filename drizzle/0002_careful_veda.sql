CREATE TABLE `ui_design_systems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`owner` varchar(255) NOT NULL,
	`platform` varchar(255) NOT NULL,
	`tech` text NOT NULL,
	`features` text NOT NULL,
	`url` text NOT NULL,
	`companionLinks` text NOT NULL,
	`difficulty` enum('초급','중급','고급') NOT NULL,
	`previewKind` enum('button','form','card','table') NOT NULL,
	`source` varchar(120) NOT NULL DEFAULT 'Component Gallery',
	`lastVerifiedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ui_design_systems_id` PRIMARY KEY(`id`),
	CONSTRAINT `ui_design_systems_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE INDEX `ui_design_systems_difficulty_idx` ON `ui_design_systems` (`difficulty`);--> statement-breakpoint
CREATE INDEX `ui_design_systems_owner_idx` ON `ui_design_systems` (`owner`);