import { MigrationInterface, QueryRunner } from "typeorm";

export class VVerisonNumber1735911613760 implements MigrationInterface {
    name = 'VVerisonNumber1735911613760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Test-Selection" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "staffId" integer, "medicalTestId" integer, CONSTRAINT "PK_1756c1eae07fbfa3b08b561b8ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Test-Selection" ADD CONSTRAINT "FK_84e4218e80d3fbd428fd066a3d5" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Test-Selection" ADD CONSTRAINT "FK_d12ebea44285b391019cd8a02da" FOREIGN KEY ("medicalTestId") REFERENCES "MedicalTest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Test-Selection" DROP CONSTRAINT "FK_d12ebea44285b391019cd8a02da"`);
        await queryRunner.query(`ALTER TABLE "Test-Selection" DROP CONSTRAINT "FK_84e4218e80d3fbd428fd066a3d5"`);
        await queryRunner.query(`DROP TABLE "Test-Selection"`);
    }

}
