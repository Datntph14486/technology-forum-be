import {
    AfterLoad,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';

import { BaseEntity } from '../common/base.entity';
import { UserEntity } from '../user/user.entity';
import { TopicEntity } from '../topic/topic.entity';
import { bool } from 'aws-sdk/clients/signer';
import { DiscussEntity } from '../discuss/discuss.entity';
import convertViews from 'src/common/util/convert-views';

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
    @JoinColumn()
    topic: TopicEntity;

    @OneToMany(() => DiscussEntity, (discuss) => discuss.post)
    discuss: DiscussEntity[];

    @AfterLoad()
    convertViews() {
        this.views = convertViews(this.views);
        this.totalLikes = convertViews(this.totalLikes);
        this.totalShares = convertViews(this.totalShares);
    }
}
