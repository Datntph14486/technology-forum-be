import * as bcrypt from 'bcrypt';
import { GENDER, Role } from 'src/common/constants';

import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
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

    @Column({ name: 'date_of_birth', nullable: true })
    dateOfBirth: string;

    @Column({ name: 'password', nullable: false })
    password: string;

    @Column({ name: 'verfify', nullable: true })
    verfify: boolean;

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
}
