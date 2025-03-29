PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_entries_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text DEFAULT 'Entry without title' NOT NULL,
	`description` text DEFAULT 'Entry without description' NOT NULL,
	`date` text
);
--> statement-breakpoint
INSERT INTO `__new_entries_table`("id", "title", "description", "date") SELECT "id", "title", "description", "date" FROM `entries_table`;--> statement-breakpoint
DROP TABLE `entries_table`;--> statement-breakpoint
ALTER TABLE `__new_entries_table` RENAME TO `entries_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;