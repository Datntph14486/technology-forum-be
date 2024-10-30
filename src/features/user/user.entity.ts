import * as bcrypt from 'bcrypt';
import { GENDER, Role } from 'src/common/constants';

import {
    BaseEntity,
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { FileEntity } from '../file/file.entity';
import { PostEntity } from '../post/post.entity';
import { DiscussEntity } from '../discuss/discuss.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'email', unique: true, nullable: false })
    email: string;

    @Column({ name: 'user_name', unique: true, nullable: false })
    username: string;

    @Column({ name: 'first_name', nullable: true })
    firstName: string;

    @Column({ name: 'last_name', nullable: true })
    lastName: string;

    @Column({ type: 'enum', enum: GENDER, name: 'gender', nullable: true })
    gender: string;

    @Column({ type: 'date', name: 'date_of_birth', nullable: true })
    dateOfBirth: Date;

    @Column({ name: 'password', nullable: false })
    password: string;

    @Column({ name: 'verfify', nullable: true })
    verfify: boolean;

    @Column({ name: 'hashedRT', nullable: true })
    hashedRT: string;

    @Column({ name: 'blocked', nullable: true })
    blocked: boolean;

    @Column({ name: 'phone', nullable: true })
    phone: string;

    @Column({ name: 'country', nullable: true })
    country: string;

    @Column({ name: 'city', nullable: true })
    city: string;

    @Column({ name: 'district', nullable: true })
    district: string;

    @Column({ name: 'full_address', nullable: true })
    fullAddress: string;

    @OneToOne(() => FileEntity)
    @JoinColumn()
    avatar: FileEntity;

    @Column({ name: 'forgot_password_token', nullable: true })
    forgotPasswordToken: string;

    @Column({ name: 'forgot_password_expired_at', nullable: true })
    forgotPasswordExpiredAt: Date;

    @Column({
        type: 'enum',
        name: 'role',
        enum: Role,
        default: Role.CUSTOMER,
    })
    role: Role;

    @Column({ type: 'int4', name: 'total_unread_notification', default: 0 })
    totalUnreadNotification: number;

    @Column({ type: 'int4', name: 'total_follower', default: 0 })
    totalFollower: number;

    @Column({ type: 'int4', name: 'total_following', default: 0 })
    totalFollowing: number;

    @OneToMany(() => PostEntity, (post) => post.author)
    @JoinColumn()
    posts: PostEntity[];

    @OneToMany(() => DiscussEntity, (discuss) => discuss.author)
    @JoinColumn()
    discuss: DiscussEntity[];

    @Column({ name: 'deleted_at', nullable: true })
    deletedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
}
