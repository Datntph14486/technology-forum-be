import * as bcrypt from 'bcrypt';
import { GENDER, Role } from 'src/common/constants';

import {
    AfterLoad,
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { FileEntity } from '../file/file.entity';

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

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    // @AfterLoad()
    // removePassword() {
    //     this.password = undefined;
    // }
}
