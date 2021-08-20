import {MigrationInterface, QueryRunner} from "typeorm";

export class newFieldToProductTable1629396032358 implements MigrationInterface {
    name = 'newFieldToProductTable1629396032358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "FK_f70b268affe05f6e9df0dab57b0"`);
        await queryRunner.query(`ALTER TABLE "public"."product" ALTER COLUMN "providerId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD CONSTRAINT "FK_f70b268affe05f6e9df0dab57b0" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "FK_f70b268affe05f6e9df0dab57b0"`);
        await queryRunner.query(`ALTER TABLE "public"."product" ALTER COLUMN "providerId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD CONSTRAINT "FK_f70b268affe05f6e9df0dab57b0" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
