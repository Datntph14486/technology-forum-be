import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { REQUEST_POST_STATUS } from './constants';

@Entity({ name: 'request-posts' })
export class RequestPostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'title', nullable: false })
    title: string;

    @Column({ type: 'text', name: 'content', nullable: false })
    content: string;

    @Column({ name: 'tags', nullable: true })
    tags: string;

    @Column({ name: 'topic_id', nullable: true })
    topicId: number;

    @Column({
        type: 'enum',
        enum: REQUEST_POST_STATUS,
        name: 'status',
        nullable: true,
        default: REQUEST_POST_STATUS.PENDING,
    })
    status: REQUEST_POST_STATUS;

    @Column({ type: 'text', name: 'feedback', nullable: true })
    feedback: string;

    @Column({ name: 'created_by_id' })
    created_by_id: number;

    @Column({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: 'updated_at' })
    updatedAt: Date;

    @Column({ name: 'deleted_at', nullable: true })
    deletedAt: Date;

    @BeforeInsert()
    insertCreated() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    insertUpdated() {
        this.updatedAt = new Date();
    }
}
