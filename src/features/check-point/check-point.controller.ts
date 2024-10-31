import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Put,
    UseGuards,
} from '@nestjs/common';
import { IncrementOrReducePointsDto } from './dto/increment-points-or-reduce.dto';
import { getCurrentUserId } from '../auth/decorators';
import { CheckPointService } from './check-point.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/common/constants';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('check-points')
export class CheckPointController {
    constructor(private checkPointService: CheckPointService) {}

    @Put('increment')
    @Roles([Role.ADMIN, Role.CUSTOMER])
    @HttpCode(HttpStatus.OK)
    async incrementPoints(
        @getCurrentUserId() userId: number,
        @Body() dto: IncrementOrReducePointsDto,
    ) {
        return this.checkPointService.incrementPoints(userId, dto);
    }

    @Put('reduce')
    @Roles([Role.ADMIN, Role.CUSTOMER])
    @HttpCode(HttpStatus.OK)
    async reducePoints(
        @getCurrentUserId() userId: number,
        @Body() dto: IncrementOrReducePointsDto,
    ) {
        return this.checkPointService.reducePoints(userId, dto);
    }
}
