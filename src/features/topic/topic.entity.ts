import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { PostEntity } from '../post/post.entity';

@Entity({ name: 'topics' })
export class TopicEntity extends BaseEntity {
    @Column({ name: 'name', unique: true })
    name: string;

    @Column({ type: 'text', name: 'description' })
    description: string;

    @Column({ type: 'int4', name: 'total_post', default: 0 })
    totalPost: number;

    @OneToMany(() => PostEntity, (post) => post.topic)
    @JoinColumn()
    posts: PostEntity[];
}
