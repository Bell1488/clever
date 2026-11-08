ALTER TABLE `requests` ADD `payload_hash` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `requests` ADD `delivery_status` text DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE `requests` ADD `telegram_message_id` text;