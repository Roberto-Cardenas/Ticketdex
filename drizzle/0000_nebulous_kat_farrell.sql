CREATE TABLE `events_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`datetime` text NOT NULL,
	`email` text NOT NULL,
	`locationName` text NOT NULL,
	`locationAddress` text NOT NULL,
	`ticketType` text NOT NULL,
	`ticketURI` text NOT NULL
);
