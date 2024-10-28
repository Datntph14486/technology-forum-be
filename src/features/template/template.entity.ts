import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { TEMPLATE_TYPE } from './constants';

@Entity({ name: 'templates' })
export class TemplateEntity extends BaseEntity {
    @Column({ type: 'enum', enum: TEMPLATE_TYPE, name: 'type' })
    type: TEMPLATE_TYPE;

    @Column({ name: 'to' })
    to: string;

    @Column({ name: 'cc' })
    cc: string;

    @Column({ name: 'subject' })
    subject: string;

    @Column({ type: 'text', name: 'body' })
    body: string;
}
