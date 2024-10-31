import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

@Entity({ name: 'follow-links' })
export class FollowLinkEntity extends BaseEntity {
    @Column({ type: 'int4', name: 'user_id', nullable: false })
    userId: number;

    @Column({ type: 'json', name: 'followers' })
    followers: string;

    @Column({ type: 'json', name: 'followings' })
    followings: string;
}
