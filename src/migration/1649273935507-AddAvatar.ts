import {MigrationInterface, QueryRunner} from 'typeorm';

export class AddAvatar1649273935507 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE Users ADD COLUMN avatar VARCHAR(255)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE Users DROP COLUMN avatar
        `);
    }
}