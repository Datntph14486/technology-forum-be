import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '../common/base.entity';
import { PostEntity } from '../post/post.entity';
import { UserEntity } from '../user/user.entity';
import { FileEntity } from '../file/file.entity';

@Entity({ name: 'discuss' })
export class DiscussEntity extends BaseEntity {
    @Column({ type: 'text', name: 'content', nullable: false })
    content: string;

    @Column({ type: 'int4', name: 'point', default: 0 })
    point: number;

    @Column({ type: 'json', name: 'detail_point' })
    detailPoint: string;

    @ManyToOne(() => DiscussEntity, (discuss) => discuss.children)
    parent: DiscussEntity;

    @OneToMany(() => DiscussEntity, (discuss) => discuss.parent)
    children: DiscussEntity[];

    @ManyToOne(() => PostEntity, (post) => post.discuss)
    @JoinColumn()
    post: PostEntity;

    @ManyToOne(() => UserEntity, (user) => user.discuss)
    @JoinColumn()
    author: UserEntity;

    @OneToMany(() => FileEntity, (file) => file)
    @JoinColumn()
    images: FileEntity[];
}
