import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowLinkEntity } from './follow-links.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { COMMON_MESSAGE, NOT_FOUND_ERROR } from 'src/common/constants';
import { CreateFollowLinkDto } from './dto/create-follow-link.dto';

@Injectable()
export class FollowLinkService {
    constructor(
        @InjectRepository(FollowLinkEntity)
        private readonly followLinkRepository: Repository<FollowLinkEntity>,

        private userService: UserService,
    ) {}

    async create(dto: CreateFollowLinkDto) {
        const user = await this.userService.findById(dto.userId);

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        const oldFollowLink = await this.followLinkRepository.findOne({
            where: {
                userId: dto.userId,
            },
        });

        if (oldFollowLink) {
            throw new ConflictException(COMMON_MESSAGE.FOLLOW_LINK_EXISTS);
        }

        const followLink = await this.followLinkRepository.create({
            userId: dto.userId,
            followers: JSON.stringify([]),
            followings: JSON.stringify([]),
        });

        const saveFollowLink = await this.followLinkRepository.save(followLink);

        return saveFollowLink;
    }

    async getFollowerAndFollowing(
        userId: number,
    ): Promise<{ followers: any; followings: any }> {
        const user = await this.userService.findById(userId);

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        const followLink = await this.followLinkRepository.findOne({
            where: {
                userId,
            },
        });

        if (!followLink) {
            return {
                followers: [],
                followings: [],
            };
        } else {
            return {
                followers: followLink.followers,
                followings: followLink.followings,
            };
        }
    }

    async getByUserId(userId: number) {
        const user = await this.userService.findById(userId);

        if (!user) {
            throw new NotFoundException(NOT_FOUND_ERROR.USER);
        }

        const followLink = await this.followLinkRepository.findOne({
            where: {
                userId,
            },
        });

        if (!followLink) {
            throw new NotFoundException(NOT_FOUND_ERROR.FOLLOW_LINK);
        }

        return followLink;
    }
}
