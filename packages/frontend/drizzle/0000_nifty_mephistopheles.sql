CREATE TABLE IF NOT EXISTS "organizations" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"slug" varchar(256) NOT NULL,
	"image_url" varchar(256) NOT NULL,
	"has_image" boolean NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"public_metadata" jsonb,
	"private_metadata" jsonb,
	"max_allowed_memberships" integer NOT NULL,
	"admin_delete_enabled" boolean NOT NULL,
	"members_count" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text,
	"first_name" text,
	"last_name" text,
	"image_url" text NOT NULL,
	"has_image" boolean DEFAULT false NOT NULL,
	"primary_email_address" text,
	"primary_phone_number" text,
	"public_metadata" jsonb,
	"private_metadata" jsonb,
	"unsafe_metadata" jsonb,
	"last_sign_in_at" date,
	"created_at" date,
	"updated_at" date NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_by_idx" ON "organizations" ("created_by");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "organizations" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "slug_idx" ON "organizations" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "username_idx" ON "users" ("username");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "primary_email_address_idx" ON "users" ("primary_email_address");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "primary_phone_number_idx" ON "users" ("primary_phone_number");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
