import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../common/base.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'device_tokens' })
export class DeviceTokenEntity extends BaseEntity {
    @Column({ type: 'text', name: 'device_type' })
    deviceType: string;

    @Column({ type: 'text', name: 'device_name' })
    deviceName: string;

    @Column({ type: 'text', name: 'device_token' })
    deviceToken: string;

    @ManyToOne(() => UserEntity, (user) => user.deviceTokens)
    @JoinColumn()
    target: UserEntity;
}
