import {MigrationInterface, QueryRunner} from "typeorm";

export class productTable1627579454381 implements MigrationInterface {
    name = 'productTable1627579454381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "price" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "providerId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_f70b268affe05f6e9df0dab57b0" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_f70b268affe05f6e9df0dab57b0"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
