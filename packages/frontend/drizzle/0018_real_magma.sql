ALTER TABLE "grants" DROP CONSTRAINT "grants_funding_amount_currency_currencies_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grants" ADD CONSTRAINT "grants_funding_amount_currency_fiat_currencies_id_fk" FOREIGN KEY ("funding_amount_currency") REFERENCES "fiat_currencies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
