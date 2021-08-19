import { MigrationInterface, QueryRunner } from 'typeorm';

export class productTableInNameAltered1629322347753
  implements MigrationInterface
{
  name = 'productTableInNameAltered1629322347753';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP COLUMN "name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD "name" character varying(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP COLUMN "name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD "name" character varying(150) NOT NULL`,
    );
  }
}
