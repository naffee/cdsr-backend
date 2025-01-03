import { MigrationInterface, QueryRunner } from "typeorm";

export class VVerisonNumber1735836261378 implements MigrationInterface {
    name = 'VVerisonNumber1735836261378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "MedicalSubCategory" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "categoryId" integer, CONSTRAINT "PK_c5fa1c0bfcd58972d06c4dbb965" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "MedicalCategory" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_e5a90239878360efbaca20c183f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "MedicalTest" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "price" character varying NOT NULL, "categoryId" integer, "subcategoryId" integer, CONSTRAINT "PK_bb2e35bec304cb24d7a3452ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medical_test_staff_staff" ("medicalTestId" integer NOT NULL, "staffId" integer NOT NULL, CONSTRAINT "PK_3b735be7a33df543b58f1982019" PRIMARY KEY ("medicalTestId", "staffId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_61e6eb7d2b9b936161f27bfbef" ON "medical_test_staff_staff" ("medicalTestId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9bca58f99b15fa1ef8edcaeb80" ON "medical_test_staff_staff" ("staffId") `);
        await queryRunner.query(`ALTER TABLE "Staff" ADD "employmentStatus" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Staff" ADD "status" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Incident" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "Incident" ADD "time" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "MedicalSubCategory" ADD CONSTRAINT "FK_fa2ea8d20160093a06def18e404" FOREIGN KEY ("categoryId") REFERENCES "MedicalCategory"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "MedicalTest" ADD CONSTRAINT "FK_91f75ec81d3f26202bf34ce68e5" FOREIGN KEY ("categoryId") REFERENCES "MedicalCategory"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "MedicalTest" ADD CONSTRAINT "FK_5c21da001be38c1a637df2ae5ff" FOREIGN KEY ("subcategoryId") REFERENCES "MedicalSubCategory"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_test_staff_staff" ADD CONSTRAINT "FK_61e6eb7d2b9b936161f27bfbef9" FOREIGN KEY ("medicalTestId") REFERENCES "MedicalTest"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "medical_test_staff_staff" ADD CONSTRAINT "FK_9bca58f99b15fa1ef8edcaeb807" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medical_test_staff_staff" DROP CONSTRAINT "FK_9bca58f99b15fa1ef8edcaeb807"`);
        await queryRunner.query(`ALTER TABLE "medical_test_staff_staff" DROP CONSTRAINT "FK_61e6eb7d2b9b936161f27bfbef9"`);
        await queryRunner.query(`ALTER TABLE "MedicalTest" DROP CONSTRAINT "FK_5c21da001be38c1a637df2ae5ff"`);
        await queryRunner.query(`ALTER TABLE "MedicalTest" DROP CONSTRAINT "FK_91f75ec81d3f26202bf34ce68e5"`);
        await queryRunner.query(`ALTER TABLE "MedicalSubCategory" DROP CONSTRAINT "FK_fa2ea8d20160093a06def18e404"`);
        await queryRunner.query(`ALTER TABLE "Incident" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "Incident" ADD "time" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Staff" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "Staff" DROP COLUMN "employmentStatus"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9bca58f99b15fa1ef8edcaeb80"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_61e6eb7d2b9b936161f27bfbef"`);
        await queryRunner.query(`DROP TABLE "medical_test_staff_staff"`);
        await queryRunner.query(`DROP TABLE "MedicalTest"`);
        await queryRunner.query(`DROP TABLE "MedicalCategory"`);
        await queryRunner.query(`DROP TABLE "MedicalSubCategory"`);
    }

}
