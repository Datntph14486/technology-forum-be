import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { UserEntity } from '../user/user.entity';
import { TopicEntity } from '../topic/topic.entity';
import { bool } from 'aws-sdk/clients/signer';

@Entity({ name: 'posts' })
export class PostEntity extends BaseEntity {
    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'content' })
    content: string;

    @Column({ type: 'int4', name: 'views', default: 0 })
    views: number;

    @Column({ type: 'int4', name: 'total_likes', default: 0 })
    totalLikes: number;

    @Column({ type: 'int4', name: 'total_Shares', default: 0 })
    totalShares: number;

    @Column({ type: 'int4', name: 'point', default: 0 })
    point: number;

    @Column({ name: 'tags' })
    tags: string;

    @Column({ type: 'bool', name: 'status', default: true })
    status: bool;

    @ManyToOne(() => UserEntity, (user) => user.posts)
    @JoinColumn()
    author: UserEntity;

    @ManyToOne(() => TopicEntity, (topic) => topic.posts)
    topic: TopicEntity;
}
