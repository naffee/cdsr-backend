import { MigrationInterface, QueryRunner } from "typeorm";

export class VVerisonNumber1735787117686 implements MigrationInterface {
    name = 'VVerisonNumber1735787117686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "background_check_types" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_492c805a3f2d2a1205c128e60af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "background_checks" ("id" SERIAL NOT NULL, "details" text NOT NULL, "status" character varying NOT NULL, "checkDate" TIMESTAMP NOT NULL, "staffId" integer, "checkTypeId" integer, CONSTRAINT "PK_0db3759452d2be6d0e0027abe76" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Incident" DROP CONSTRAINT "UQ_15478408754493ae372a3ce4add"`);
        await queryRunner.query(`ALTER TABLE "Incident" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "Incident" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "Incident" DROP COLUMN "feesPaid"`);
        await queryRunner.query(`ALTER TABLE "Incident" ADD "date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Incident" ADD "peopleInvolved" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Incident" ADD CONSTRAINT "UQ_2548f2115826356c37579300f45" UNIQUE ("peopleInvolved")`);
        await queryRunner.query(`ALTER TABLE "Incident" ADD "cdsrAgent" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Incident" ADD "reportedById" integer`);
        await queryRunner.query(`ALTER TABLE "Staff" DROP COLUMN "staffType"`);
        await queryRunner.query(`CREATE TYPE "public"."Staff_stafftype_enum" AS ENUM('Driver', 'Domestic Staff', 'Security Guard')`);
        await queryRunner.query(`ALTER TABLE "Staff" ADD "staffType" "public"."Staff_stafftype_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Incident" ADD CONSTRAINT "FK_9ab83e17a4c545d1cf0216fb537" FOREIGN KEY ("reportedById") REFERENCES "Auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "background_checks" ADD CONSTRAINT "FK_271f1511914776356d75fca6e79" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "background_checks" ADD CONSTRAINT "FK_d7ae0ee779680e926b50bffd7ef" FOREIGN KEY ("checkTypeId") REFERENCES "background_check_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "background_checks" DROP CONSTRAINT "FK_d7ae0ee779680e926b50bffd7ef"`);
        await queryRunner.query(`ALTER TABLE "background_checks" DROP CONSTRAINT "FK_271f1511914776356d75fca6e79"`);
        await queryRunner.query(`ALTER TABLE "Incident" DROP CONSTRAINT "FK_9ab83e17a4c545d1cf0216fb537"`);
        await queryRunner.query(`ALTER TABLE "Staff" DROP COLUMN "staffType"`);
        await queryRunner.query(`DROP TYPE "public"."Staff_stafftype_enum"`);
        await queryRunner.query(`ALTER TABLE "Staff" ADD "staffType" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Incident" DROP COLUMN "reportedById"`);
        await queryRunner.query(`ALTER TABLE "Incident" DROP COLUMN "cdsrAgent"`);
        await queryRunner.query(`ALTER TABLE "Incident" DROP CONSTRAINT "UQ_2548f2115826356c37579300f45"`);
        await queryRunner.query(`ALTER TABLE "Incident" DROP COLUMN "peopleInvolved"`);
        await queryRunner.query(`ALTER TABLE "Incident" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "Incident" ADD "feesPaid" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Incident" ADD "image" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Incident" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Incident" ADD CONSTRAINT "UQ_15478408754493ae372a3ce4add" UNIQUE ("name")`);
        await queryRunner.query(`DROP TABLE "background_checks"`);
        await queryRunner.query(`DROP TABLE "background_check_types"`);
    }

}
