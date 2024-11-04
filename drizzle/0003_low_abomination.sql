PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_config_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`deleteEventOffset` integer DEFAULT 7
);
--> statement-breakpoint
INSERT INTO `__new_config_table`("id", "deleteEventOffset") SELECT "id", "deleteEventOffset" FROM `config_table`;--> statement-breakpoint
DROP TABLE `config_table`;--> statement-breakpoint
ALTER TABLE `__new_config_table` RENAME TO `config_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;