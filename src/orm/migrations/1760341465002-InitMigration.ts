import {MigrationInterface, QueryRunner} from "typeorm";

export class InitMigration1760341465002 implements MigrationInterface {
    name = 'InitMigration1760341465002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Меблі_Кімната" DROP CONSTRAINT "FK_13769510ed02e376a14b8f4a013"
        `);
        await queryRunner.query(`
            ALTER TABLE "Меблі_Кімната" DROP CONSTRAINT "FK_e068b6861d9dfa1c4cdc3025dea"
        `);
        await queryRunner.query(`
            ALTER TABLE "Тариф_Кімната" DROP CONSTRAINT "FK_f535638b020a06c1e812454dec6"
        `);
        await queryRunner.query(`
            ALTER TABLE "Тариф_Кімната" DROP CONSTRAINT "FK_6ad6055457d6e03833b18905a43"
        `);
        await queryRunner.query(`
            ALTER TABLE "Історія кімнат студента" DROP CONSTRAINT "FK_d1913e4c7b208535b4b44bb622f"
        `);
        await queryRunner.query(`
            ALTER TABLE "Історія кімнат студента" DROP CONSTRAINT "FK_af3e006b529fe039035591ed6fb"
        `);
        await queryRunner.query(`
            ALTER TABLE "Квитанція на проживання" DROP CONSTRAINT "FK_4df1dc1bd5abb50af9f3776a510"
        `);
        await queryRunner.query(`
            ALTER TABLE "Оплата" DROP CONSTRAINT "FK_3324d60c597c9289580d14a92d3"
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на компенсацію коштів" DROP CONSTRAINT "FK_2864a886050710d7dd900c71d11"
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на ремонт" DROP CONSTRAINT "FK_c567b31d6c08cceb7f6ca32c996"
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на ремонт" DROP CONSTRAINT "FK_8269de896cf4731896ebdead28c"
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на виселення" DROP CONSTRAINT "FK_79b62c7c9d2e46534a62bf44990"
        `);
        await queryRunner.query(`
            ALTER TABLE "Квитанція на проживання"
                RENAME COLUMN "student_id" TO "studentId"
        `);
        await queryRunner.query(`
            ALTER TABLE "Оплата"
                RENAME COLUMN "student_id" TO "studentId"
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на компенсацію коштів"
                RENAME COLUMN "technical_staff_id" TO "technicalStaffId"
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на виселення"
                RENAME COLUMN "student_id" TO "studentId"
        `);
        await queryRunner.query(`
            ALTER TABLE "Меблі_Кімната" DROP COLUMN "room_room_number"
        `);
        await queryRunner.query(`
            ALTER TABLE "Меблі_Кімната" DROP COLUMN "furniture_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "Тариф_Кімната" DROP COLUMN "room_room_number"
        `);
        await queryRunner.query(`
            ALTER TABLE "Тариф_Кімната" DROP COLUMN "tariff_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "Історія кімнат студента" DROP COLUMN "room_room_number"
        `);
        await queryRunner.query(`
            ALTER TABLE "Історія кімнат студента" DROP COLUMN "student_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на ремонт" DROP COLUMN "student_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на ремонт" DROP COLUMN "technical_staff_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "Меблі_Кімната"
            ADD "roomRoomNumber" smallint
        `);
        await queryRunner.query(`
            ALTER TABLE "Меблі_Кімната"
            ADD "furnitureId" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "Тариф_Кімната"
            ADD "roomRoomNumber" smallint
        `);
        await queryRunner.query(`
            ALTER TABLE "Тариф_Кімната"
            ADD "tariffId" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "Історія кімнат студента"
            ADD "roomRoomNumber" smallint
        `);
        await queryRunner.query(`
            ALTER TABLE "Історія кімнат студента"
            ADD "studentId" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на ремонт"
            ADD "studentId" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на ремонт"
            ADD "technicalStaffId" bigint
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."Квитанція на проживання_статус оп"
            RENAME TO "Квитанція на проживання_статус оп_old"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."Квитанція на проживання_статус оплати_enum" AS ENUM('Оплачено', 'Часткова оплата', 'Борг')
        `);
        await queryRunner.query(`
            ALTER TABLE "Квитанція на проживання"
            ALTER COLUMN "Статус оплати" TYPE "public"."Квитанція на проживання_статус оплати_enum" USING "Статус оплати"::"text"::"public"."Квитанція на проживання_статус оплати_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."Квитанція на проживання_статус оп_old"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."Заява на компенсацію коштів_стату"
            RENAME TO "Заява на компенсацію коштів_стату_old"
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
            ALTER TABLE "Заява на компенсацію коштів"
            ALTER COLUMN "Статус" TYPE "public"."Заява на компенсацію коштів_статус_enum" USING "Статус"::"text"::"public"."Заява на компенсацію коштів_статус_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."Заява на компенсацію коштів_стату_old"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "email" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "username"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "username" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "name" character varying
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
            ALTER TABLE "users" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "name" character varying(40)
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "username"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "username" character varying(40)
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "email" character varying(100) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."Заява на компенсацію коштів_стату_old" AS ENUM(
                'У процесі',
                'Заявлено',
                'Виконано',
                'Затверджено',
                'Відхилено',
                'Підтверджено'
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на компенсацію коштів"
            ALTER COLUMN "Статус" TYPE "public"."Заява на компенсацію коштів_стату_old" USING "Статус"::"text"::"public"."Заява на компенсацію коштів_стату_old"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."Заява на компенсацію коштів_статус_enum"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."Заява на компенсацію коштів_стату_old"
            RENAME TO "Заява на компенсацію коштів_стату"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."Квитанція на проживання_статус оп_old" AS ENUM('Оплачено', 'Часткова оплата', 'Борг')
        `);
        await queryRunner.query(`
            ALTER TABLE "Квитанція на проживання"
            ALTER COLUMN "Статус оплати" TYPE "public"."Квитанція на проживання_статус оп_old" USING "Статус оплати"::"text"::"public"."Квитанція на проживання_статус оп_old"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."Квитанція на проживання_статус оплати_enum"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."Квитанція на проживання_статус оп_old"
            RENAME TO "Квитанція на проживання_статус оп"
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на ремонт" DROP COLUMN "technicalStaffId"
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на ремонт" DROP COLUMN "studentId"
        `);
        await queryRunner.query(`
            ALTER TABLE "Історія кімнат студента" DROP COLUMN "studentId"
        `);
        await queryRunner.query(`
            ALTER TABLE "Історія кімнат студента" DROP COLUMN "roomRoomNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "Тариф_Кімната" DROP COLUMN "tariffId"
        `);
        await queryRunner.query(`
            ALTER TABLE "Тариф_Кімната" DROP COLUMN "roomRoomNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "Меблі_Кімната" DROP COLUMN "furnitureId"
        `);
        await queryRunner.query(`
            ALTER TABLE "Меблі_Кімната" DROP COLUMN "roomRoomNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на ремонт"
            ADD "technical_staff_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на ремонт"
            ADD "student_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "Історія кімнат студента"
            ADD "student_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "Історія кімнат студента"
            ADD "room_room_number" smallint
        `);
        await queryRunner.query(`
            ALTER TABLE "Тариф_Кімната"
            ADD "tariff_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "Тариф_Кімната"
            ADD "room_room_number" smallint
        `);
        await queryRunner.query(`
            ALTER TABLE "Меблі_Кімната"
            ADD "furniture_id" bigint
        `);
        await queryRunner.query(`
            ALTER TABLE "Меблі_Кімната"
            ADD "room_room_number" smallint
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на виселення"
                RENAME COLUMN "studentId" TO "student_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на компенсацію коштів"
                RENAME COLUMN "technicalStaffId" TO "technical_staff_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "Оплата"
                RENAME COLUMN "studentId" TO "student_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "Квитанція на проживання"
                RENAME COLUMN "studentId" TO "student_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на виселення"
            ADD CONSTRAINT "FK_79b62c7c9d2e46534a62bf44990" FOREIGN KEY ("student_id") REFERENCES "Студент"("Id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на ремонт"
            ADD CONSTRAINT "FK_8269de896cf4731896ebdead28c" FOREIGN KEY ("technical_staff_id") REFERENCES "Технічний персонал"("Id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на ремонт"
            ADD CONSTRAINT "FK_c567b31d6c08cceb7f6ca32c996" FOREIGN KEY ("student_id") REFERENCES "Студент"("Id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "Заява на компенсацію коштів"
            ADD CONSTRAINT "FK_2864a886050710d7dd900c71d11" FOREIGN KEY ("technical_staff_id") REFERENCES "Технічний персонал"("Id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "Оплата"
            ADD CONSTRAINT "FK_3324d60c597c9289580d14a92d3" FOREIGN KEY ("student_id") REFERENCES "Студент"("Id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "Квитанція на проживання"
            ADD CONSTRAINT "FK_4df1dc1bd5abb50af9f3776a510" FOREIGN KEY ("student_id") REFERENCES "Студент"("Id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "Історія кімнат студента"
            ADD CONSTRAINT "FK_af3e006b529fe039035591ed6fb" FOREIGN KEY ("student_id") REFERENCES "Студент"("Id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "Історія кімнат студента"
            ADD CONSTRAINT "FK_d1913e4c7b208535b4b44bb622f" FOREIGN KEY ("room_room_number") REFERENCES "Кімната"("Номер кімнати") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "Тариф_Кімната"
            ADD CONSTRAINT "FK_6ad6055457d6e03833b18905a43" FOREIGN KEY ("tariff_id") REFERENCES "Тариф"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "Тариф_Кімната"
            ADD CONSTRAINT "FK_f535638b020a06c1e812454dec6" FOREIGN KEY ("room_room_number") REFERENCES "Кімната"("Номер кімнати") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "Меблі_Кімната"
            ADD CONSTRAINT "FK_e068b6861d9dfa1c4cdc3025dea" FOREIGN KEY ("furniture_id") REFERENCES "Меблі"("Id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "Меблі_Кімната"
            ADD CONSTRAINT "FK_13769510ed02e376a14b8f4a013" FOREIGN KEY ("room_room_number") REFERENCES "Кімната"("Номер кімнати") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
    }

}
