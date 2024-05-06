DO $$ BEGIN
 CREATE TYPE "license_log_action" AS ENUM('SUCCESS', 'EXPIRED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "license_log_type" AS ENUM('LICENSE_VALIDATE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "License_usage" (
	"created_at" timestamp (2) with time zone DEFAULT now() NOT NULL,
	"license_id" uuid NOT NULL,
	"type" "license_log_type",
	"action" "license_log_action"
);
--> statement-breakpoint
DO $$ BEGIN
  CREATE EXTENSION IF NOT EXISTS timescaledb;
END $$;
--> statement-breakpoint
SELECT create_hypertable('"License_usage"', 'created_at', if_not_exists => TRUE, migrate_data => TRUE);
