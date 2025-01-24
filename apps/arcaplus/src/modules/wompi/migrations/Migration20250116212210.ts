import { Migration } from '@mikro-orm/migrations';

export class Migration20250116212210 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "payment_source" ("id" text not null, "data" jsonb not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "payment_source_pkey" primary key ("id"));');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_payment_source_deleted_at" ON "payment_source" (deleted_at) WHERE deleted_at IS NULL;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "payment_source" cascade;');
  }

}
