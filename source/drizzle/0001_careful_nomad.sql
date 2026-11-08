ALTER TABLE `requests` ADD `attribution` text DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE `requests` ADD `consent_version` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `requests` ADD `consent_at` integer DEFAULT 0 NOT NULL;