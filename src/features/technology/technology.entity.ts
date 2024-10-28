import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { FileEntity } from '../file/file.entity';

@Entity({ name: 'technologies' })
export class TechnologyEntity extends BaseEntity {
    @Column({ name: 'name', unique: true })
    name: string;

    @Column({ type: 'text', name: 'description' })
    description: string;

    @OneToOne(() => FileEntity)
    @JoinColumn()
    icon: FileEntity;
}
