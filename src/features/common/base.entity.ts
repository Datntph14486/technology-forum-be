import {
    BeforeUpdate,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
    @Column()
    @CreateDateColumn({ type: 'timestamp', nullable: true })
    createdAt: Date;

    @Column()
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt: Date;

    @BeforeUpdate()
    updateDate() {
        this.updatedAt = new Date();
    }
}
