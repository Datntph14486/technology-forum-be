import { FollowEntity } from './follow.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { NOT_FOUND_ERROR } from 'src/common/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(FollowEntity)
        private readonly followRepository: Repository<FollowEntity>,
        private userService: UserService,
    ) {}

    async followOrUnFollow(userId: number, targetId: number) {
        const user = await this.userService.findById(userId);
        const targetUser = await this.userService.findById(targetId);

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        if (!targetUser) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        const oldFollow = await this.followRepository.findOne({
            where: {
                user,
                targetId: targetUser.id,
            },
        });

        if (!oldFollow) {
            const newFollow = await this.followRepository.create({
                user,
                targetId: targetUser.id,
            });
            await this.followRepository.save(newFollow);
        } else {
            await this.followRepository.delete({ id: oldFollow.id });
        }

        return true;
    }
}
