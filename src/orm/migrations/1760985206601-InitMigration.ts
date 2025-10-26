import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1760985206601 implements MigrationInterface {
  name = 'InitMigration1760985206601';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."Квитанція на проживання_статус оплати_enum" AS ENUM('Оплачено', 'Часткова оплата', 'Борг')
        `);
    await queryRunner.query(`
            CREATE TABLE "Квитанція на проживання" (
                "Id" BIGSERIAL NOT NULL,
                "Дата" date NOT NULL,
                "Період" date NOT NULL,
                "Статус оплати" "public"."Квитанція на проживання_статус оплати_enum" NOT NULL,
                "studentId" bigint,
                CONSTRAINT "PK_ac54f5704502cc8fa908ffdf2b2" PRIMARY KEY ("Id")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."Оплата_статус_enum" AS ENUM('Оплачено', 'Часткова оплата', 'Борг')
        `);
    await queryRunner.query(`
            CREATE TABLE "Оплата" (
                "Id" BIGSERIAL NOT NULL,
                "Дата" date NOT NULL,
                "Квитанція оплати" jsonb NOT NULL,
                "Період" date NOT NULL,
                "Статус" "public"."Оплата_статус_enum" NOT NULL,
                "Сума" integer NOT NULL,
                "studentId" bigint,
                CONSTRAINT "PK_c941cc6f2ccd8ae52d5bafc4f9d" PRIMARY KEY ("Id")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."Заява на компенсацію коштів_статус_enum" AS ENUM(
                'У процесі',
                'Заявлено',
                'Виконано',
                'Затверджено',
                'Відхилено',
                'Підтверджено'
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Заява на компенсацію коштів" (
                "Id" BIGSERIAL NOT NULL,
                "Дата" date NOT NULL,
                "КвитанціЇ витрат" jsonb NOT NULL,
                "Призначення" text NOT NULL,
                "Статус" "public"."Заява на компенсацію коштів_статус_enum" NOT NULL,
                "technicalStaffId" bigint,
                CONSTRAINT "PK_fe97c53d19fa0b302dfa9a9f3a6" PRIMARY KEY ("Id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Технічний персонал" (
                "Id" BIGSERIAL NOT NULL,
                "Дата" date NOT NULL,
                "Номер телефону" character varying NOT NULL,
                "По-батькові" character varying NOT NULL,
                "Прізвище" character varying NOT NULL,
                "Ім'я" character varying NOT NULL,
                "Спеціалізація" text NOT NULL,
                CONSTRAINT "PK_d8cf5e281ccb11690c16420264b" PRIMARY KEY ("Id")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."Заява на ремонт_статус_enum" AS ENUM(
                'У процесі',
                'Заявлено',
                'Виконано',
                'Затверджено',
                'Відхилено',
                'Підтверджено'
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Заява на ремонт" (
                "Id" BIGSERIAL NOT NULL,
                "Дата" date NOT NULL,
                "Повідомлення" text NOT NULL,
                "Статус" "public"."Заява на ремонт_статус_enum" NOT NULL,
                "Дата виконання" date,
                "studentId" bigint,
                "technicalStaffId" bigint,
                CONSTRAINT "PK_2b12a758d60a689b596af3315b7" PRIMARY KEY ("Id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Меблі" (
                "Id" BIGSERIAL NOT NULL,
                "Назва" character varying NOT NULL,
                "Опис" text,
                CONSTRAINT "PK_046a6a4da3664688d8a24f0d7a8" PRIMARY KEY ("Id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Меблі_Кімната" (
                "Id" BIGSERIAL NOT NULL,
                "Кількість" integer NOT NULL,
                "Ціна" integer NOT NULL,
                "roomRoomNumber" smallint,
                "furnitureId" bigint,
                CONSTRAINT "PK_7e9335a02e4c51e0a56bdcf53e7" PRIMARY KEY ("Id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Тариф" (
                "Id" BIGSERIAL NOT NULL,
                "Запровадження тарифу" date NOT NULL,
                "Сума" integer NOT NULL,
                CONSTRAINT "PK_57243f024edba833db7c9a2b076" PRIMARY KEY ("Id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Тариф_Кімната" (
                "Id" BIGSERIAL NOT NULL,
                "Дата застосування" date NOT NULL,
                "Дата закінчення" date,
                "roomRoomNumber" smallint,
                "tariffId" bigint,
                CONSTRAINT "PK_033c522082b6f85f1058f5f98d1" PRIMARY KEY ("Id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Кімната" (
                "Номер кімнати" smallint NOT NULL,
                "Місця" smallint NOT NULL,
                "Площа кімнати" double precision NOT NULL,
                CONSTRAINT "PK_6c965608c5133c66146694ea32d" PRIMARY KEY ("Номер кімнати")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Історія кімнат студента" (
                "Id" BIGSERIAL NOT NULL,
                "Дата_заселення" date NOT NULL,
                "Дата_виселення" date,
                "roomRoomNumber" smallint,
                "studentId" bigint,
                CONSTRAINT "PK_a04429bd6337aa22f0f3ce0fefc" PRIMARY KEY ("Id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Студент" (
                "Id" BIGSERIAL NOT NULL,
                "Дата народження" date NOT NULL,
                "Дата реєстрації" date NOT NULL,
                "Номер студентського квитка" character varying NOT NULL,
                "Номер телефону" character varying NOT NULL,
                "Прізвище" character varying NOT NULL,
                "По-батькові" character varying NOT NULL,
                "Ім'я" character varying NOT NULL,
                "Пільги" character varying,
                CONSTRAINT "PK_da07904d359e18e48e382973ce5" PRIMARY KEY ("Id")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."Заява на виселення_статус_enum" AS ENUM(
                'У процесі',
                'Заявлено',
                'Виконано',
                'Затверджено',
                'Відхилено',
                'Підтверджено'
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Заява на виселення" (
                "Id" BIGSERIAL NOT NULL,
                "Дата" date NOT NULL,
                "Повідомлення" text NOT NULL,
                "Статус" "public"."Заява на виселення_статус_enum" NOT NULL,
                "studentId" bigint,
                CONSTRAINT "PK_918054468f769e5ae532a8ec9c4" PRIMARY KEY ("Id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "Квитанція на проживання"
            ADD CONSTRAINT "FK_77dde9202542f2ef71510dd61be" FOREIGN KEY ("studentId") REFERENCES "Студент"("Id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Оплата"
            ADD CONSTRAINT "FK_f5aa7b85332b123cd4f54d764a5" FOREIGN KEY ("studentId") REFERENCES "Студент"("Id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Заява на компенсацію коштів"
            ADD CONSTRAINT "FK_6040d519e5c282b95da8044d223" FOREIGN KEY ("technicalStaffId") REFERENCES "Технічний персонал"("Id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Заява на ремонт"
            ADD CONSTRAINT "FK_620d4427c46ab8ec31313b828d6" FOREIGN KEY ("studentId") REFERENCES "Студент"("Id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Заява на ремонт"
            ADD CONSTRAINT "FK_180e5a7aa0cbda7fb314b73d6df" FOREIGN KEY ("technicalStaffId") REFERENCES "Технічний персонал"("Id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Меблі_Кімната"
            ADD CONSTRAINT "FK_4ce5046fe6dc87ae465d8024a6e" FOREIGN KEY ("roomRoomNumber") REFERENCES "Кімната"("Номер кімнати") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Меблі_Кімната"
            ADD CONSTRAINT "FK_d99148f76019ec975631724ad7b" FOREIGN KEY ("furnitureId") REFERENCES "Меблі"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Тариф_Кімната"
            ADD CONSTRAINT "FK_a4ef0f28950f15843176d461034" FOREIGN KEY ("roomRoomNumber") REFERENCES "Кімната"("Номер кімнати") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Тариф_Кімната"
            ADD CONSTRAINT "FK_fc12b3473fa44956e83809d142b" FOREIGN KEY ("tariffId") REFERENCES "Тариф"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Історія кімнат студента"
            ADD CONSTRAINT "FK_f4811cddf7a6ece0710b9fd7e5a" FOREIGN KEY ("roomRoomNumber") REFERENCES "Кімната"("Номер кімнати") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Історія кімнат студента"
            ADD CONSTRAINT "FK_9b6355e94b97cdf4101e6f03354" FOREIGN KEY ("studentId") REFERENCES "Студент"("Id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Заява на виселення"
            ADD CONSTRAINT "FK_cd3a5bb9028d728930ac9d594eb" FOREIGN KEY ("studentId") REFERENCES "Студент"("Id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "Заява на виселення" DROP CONSTRAINT "FK_cd3a5bb9028d728930ac9d594eb"
        `);
    await queryRunner.query(`
            ALTER TABLE "Історія кімнат студента" DROP CONSTRAINT "FK_9b6355e94b97cdf4101e6f03354"
        `);
    await queryRunner.query(`
            ALTER TABLE "Історія кімнат студента" DROP CONSTRAINT "FK_f4811cddf7a6ece0710b9fd7e5a"
        `);
    await queryRunner.query(`
            ALTER TABLE "Тариф_Кімната" DROP CONSTRAINT "FK_fc12b3473fa44956e83809d142b"
        `);
    await queryRunner.query(`
            ALTER TABLE "Тариф_Кімната" DROP CONSTRAINT "FK_a4ef0f28950f15843176d461034"
        `);
    await queryRunner.query(`
            ALTER TABLE "Меблі_Кімната" DROP CONSTRAINT "FK_d99148f76019ec975631724ad7b"
        `);
    await queryRunner.query(`
            ALTER TABLE "Меблі_Кімната" DROP CONSTRAINT "FK_4ce5046fe6dc87ae465d8024a6e"
        `);
    await queryRunner.query(`
            ALTER TABLE "Заява на ремонт" DROP CONSTRAINT "FK_180e5a7aa0cbda7fb314b73d6df"
        `);
    await queryRunner.query(`
            ALTER TABLE "Заява на ремонт" DROP CONSTRAINT "FK_620d4427c46ab8ec31313b828d6"
        `);
    await queryRunner.query(`
            ALTER TABLE "Заява на компенсацію коштів" DROP CONSTRAINT "FK_6040d519e5c282b95da8044d223"
        `);
    await queryRunner.query(`
            ALTER TABLE "Оплата" DROP CONSTRAINT "FK_f5aa7b85332b123cd4f54d764a5"
        `);
    await queryRunner.query(`
            ALTER TABLE "Квитанція на проживання" DROP CONSTRAINT "FK_77dde9202542f2ef71510dd61be"
        `);
    await queryRunner.query(`
            DROP TABLE "Заява на виселення"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."Заява на виселення_статус_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "Студент"
        `);
    await queryRunner.query(`
            DROP TABLE "Історія кімнат студента"
        `);
    await queryRunner.query(`
            DROP TABLE "Кімната"
        `);
    await queryRunner.query(`
            DROP TABLE "Тариф_Кімната"
        `);
    await queryRunner.query(`
            DROP TABLE "Тариф"
        `);
    await queryRunner.query(`
            DROP TABLE "Меблі_Кімната"
        `);
    await queryRunner.query(`
            DROP TABLE "Меблі"
        `);
    await queryRunner.query(`
            DROP TABLE "Заява на ремонт"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."Заява на ремонт_статус_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "Технічний персонал"
        `);
    await queryRunner.query(`
            DROP TABLE "Заява на компенсацію коштів"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."Заява на компенсацію коштів_статус_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "Оплата"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."Оплата_статус_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "Квитанція на проживання"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."Квитанція на проживання_статус оплати_enum"
        `);
  }
}
