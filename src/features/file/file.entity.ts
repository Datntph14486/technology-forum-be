import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'files' })
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'width', nullable: true })
    width: number;

    @Column({ name: 'height', nullable: true })
    height: number;

    @Column({ name: 'mime', nullable: true })
    mime: string;

    @Column({ name: 'size', nullable: true })
    size: number;

    @Column({ name: 'url' })
    url: string;

    @Column({ name: 'provider', nullable: true })
    provider: string;

    @Column({ name: 'created_at' })
    created_at: Date;

    @Column({ name: 'updated_at' })
    updated_at: Date;

    @BeforeInsert()
    insertCreated() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    @BeforeUpdate()
    insertUpdated() {
        this.updated_at = new Date();
    }
}
