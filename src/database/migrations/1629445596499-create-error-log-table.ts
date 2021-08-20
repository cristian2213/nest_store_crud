import { MigrationInterface, QueryRunner } from 'typeorm';

export class createErrorLogTable1629445596499 implements MigrationInterface {
  name = 'createErrorLogTable1629445596499';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "error_log" ("id" SERIAL NOT NULL, "total_recors" integer NOT NULL, "loads" integer NOT NULL, "errors" integer NOT NULL, "errorLog" text NOT NULL, "file_path" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0284e7aa7afe77ea1ce1621c252" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d9f83b82cbf1fbfc1e232d4679" ON "error_log" ("created_at", "errors") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_d9f83b82cbf1fbfc1e232d4679"`);
    await queryRunner.query(`DROP TABLE "error_log"`);
  }
}
