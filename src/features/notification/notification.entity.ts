import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { UserEntity } from '../user/user.entity';
import { NOTIFICATION_TYPE } from './constants';

@Entity({ name: 'notifications' })
export class NotificationEntity extends BaseEntity {
    @Column({ name: 'title' })
    title: string;

    @Column({ type: 'text', name: 'body' })
    body: string;

    @Column({ type: 'text', name: 'data' })
    data: string;

    @Column({ type: 'enum', enum: NOTIFICATION_TYPE, name: 'type' })
    type: NOTIFICATION_TYPE;

    @ManyToOne(() => UserEntity, (user) => user)
    target: UserEntity;
}
