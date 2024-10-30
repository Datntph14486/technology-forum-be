import { Body, Controller, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { IncrementOrReducePointsDto } from './dto/increment-points-or-reduce.dto';
import { getCurrentUserId } from '../auth/decorators';
import { CheckPointService } from './check-point.service';

@Controller('check-points')
export class CheckPointController {
    constructor(private checkPointService: CheckPointService) {}

    @Put('increment-or-reduce')
    @HttpCode(HttpStatus.OK)
    async incrementOrReducePoints(
        @getCurrentUserId() userId: number,
        @Body() dto: IncrementOrReducePointsDto,
    ) {
        return this.checkPointService.incrementOrReducePoints(userId, dto);
    }
}
