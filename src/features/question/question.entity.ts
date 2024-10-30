import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { UserEntity } from '../user/user.entity';
import convertViews from 'src/common/util/convert-views';

@Entity({ name: 'questions' })
export class QuestionEntity extends BaseEntity {
    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'content', type: 'text' })
    content: string;

    @Column({ name: 'views', type: 'int4', default: 0 })
    views: number;

    @Column({ name: 'point', type: 'int4', default: 0 })
    point: number;

    @Column({ name: 'total_answers', type: 'int4', default: 0 })
    totalAnswers: number;

    @Column({ name: 'tags' })
    tags: string;

    @ManyToOne(() => UserEntity, (user) => user)
    @JoinColumn()
    author: UserEntity;

    @AfterLoad()
    convertViews() {
        this.views = convertViews(this.views);
    }
}
