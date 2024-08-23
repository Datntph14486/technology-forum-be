import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';
import { TAuth } from './type';
import { AuthSignInDto } from './dto/signin.dto';
import { Public } from './decorators/public.decorator';
import { RefreshTokenGuard } from './guards';
import { getCurrentUser, getCurrentUserId } from './decorators';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() dto: SignupDTO): Promise<TAuth> {
        return this.authService.signup(dto);
    }

    @Public()
    @Post('signIn')
    @HttpCode(HttpStatus.OK)
    signIn(@Body() dto: AuthSignInDto): Promise<TAuth> {
        return this.authService.signIn(dto);
    }

    @Public()
    @UseGuards(RefreshTokenGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(
        @getCurrentUserId() userId: number,
        @getCurrentUser('refreshToken') refreshToken: string,
    ): Promise<TAuth> {
        return this.authService.refreshTokens(userId, refreshToken);
    }

    @Public()
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@getCurrentUserId() userId: number) {
        return this.authService.logout(userId);
    }
}
