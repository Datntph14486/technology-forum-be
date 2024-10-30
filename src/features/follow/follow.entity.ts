import { Column, Entity, ManyToOne } from 'typeorm';

import { UserEntity } from './../user/user.entity';
import { BaseEntity } from '../common/base.entity';

@Entity({ name: 'follows' })
export class FollowEntity extends BaseEntity {
    @Column({ type: 'int4', name: 'target_id' })
    targetId: number;

    @ManyToOne(() => UserEntity, (user) => user)
    user: UserEntity;
}
