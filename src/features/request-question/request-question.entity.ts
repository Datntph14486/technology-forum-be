import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { REQUEST_QUESTION_STATUS } from './constants';

@Entity({ name: 'request-questions' })
export class RequestQuestionEntity extends BaseEntity {
    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'content', type: 'text' })
    content: string;

    @Column({ name: 'created_by_id' })
    createdById: number;

    @Column({ name: 'tags' })
    tags: string;

    @Column({
        name: 'status',
        enum: REQUEST_QUESTION_STATUS,
        default: REQUEST_QUESTION_STATUS.PENDING,
    })
    status: REQUEST_QUESTION_STATUS;

    @Column({ type: 'text', name: 'feedback' })
    feedback: string;
}
