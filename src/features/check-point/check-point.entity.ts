import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { UserEntity } from '../user/user.entity';
import { RELATED_TYPE } from './constants';

@Entity({ name: 'check-points' })
export class CheckPointEntity extends BaseEntity {
    @Column({ type: 'int4', name: 'related_id', nullable: false })
    relatedId: number;

    @Column({
        type: 'enum',
        enum: RELATED_TYPE,
        name: 'related_type',
        nullable: false,
    })
    relatedType: RELATED_TYPE;

    @ManyToOne(() => UserEntity, (user) => user)
    author: UserEntity;
}
