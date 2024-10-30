import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { UserEntity } from '../user/user.entity';
import { QuestionEntity } from '../question/question.entity';

@Entity({ name: 'answers' })
export class AnswerEntity extends BaseEntity {
    @Column({ type: 'text', name: 'content' })
    content: string;

    @Column({ type: 'int4', name: 'point', default: 0 })
    point: number;

    @ManyToOne(() => UserEntity, (user) => user)
    author: UserEntity;

    @ManyToOne(() => QuestionEntity, (question) => question)
    question: QuestionEntity;
}
