CREATE TABLE `ui_guide_items` (
	`id` int NOT NULL,
	`category` varchar(120) NOT NULL,
	`location` varchar(180) NOT NULL,
	`name` varchar(255) NOT NULL,
	`purpose` text NOT NULL,
	`pattern` text NOT NULL,
	`example` text NOT NULL,
	`tools` varchar(500) NOT NULL,
	`source` varchar(120) NOT NULL DEFAULT 'AI/100 Field Guide',
	`lastVerifiedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ui_guide_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `ui_guide_items_category_idx` ON `ui_guide_items` (`category`);--> statement-breakpoint
CREATE INDEX `ui_guide_items_location_idx` ON `ui_guide_items` (`location`);--> statement-breakpoint
CREATE INDEX `ui_guide_items_name_idx` ON `ui_guide_items` (`name`);