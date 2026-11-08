CREATE TABLE `requests` (
	`id` text PRIMARY KEY NOT NULL,
	`actor_id` text NOT NULL,
	`name` text NOT NULL,
	`contact` text NOT NULL,
	`channel` text NOT NULL,
	`service` text NOT NULL,
	`details` text NOT NULL,
	`created_at` integer NOT NULL
);
