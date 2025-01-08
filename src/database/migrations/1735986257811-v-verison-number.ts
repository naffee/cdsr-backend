import { MigrationInterface, QueryRunner } from "typeorm";

export class VVerisonNumber1735986257811 implements MigrationInterface {
    name = 'VVerisonNumber1735986257811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "MedicalSubCategory" DROP CONSTRAINT "FK_fa2ea8d20160093a06def18e404"`);
        await queryRunner.query(`ALTER TABLE "MedicalSubCategory" ADD CONSTRAINT "FK_fa2ea8d20160093a06def18e404" FOREIGN KEY ("categoryId") REFERENCES "MedicalCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "MedicalSubCategory" DROP CONSTRAINT "FK_fa2ea8d20160093a06def18e404"`);
        await queryRunner.query(`ALTER TABLE "MedicalSubCategory" ADD CONSTRAINT "FK_fa2ea8d20160093a06def18e404" FOREIGN KEY ("categoryId") REFERENCES "MedicalCategory"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
