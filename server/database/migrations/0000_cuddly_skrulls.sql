CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`githubId` text,
	`created_at` integer NOT NULL,
	`updated_at` integer
);
