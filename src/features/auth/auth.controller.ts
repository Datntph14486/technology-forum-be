import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';
import { TAuth } from './type';
import { AuthSigninDto } from './dto/signin.dto';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() dto: SignupDTO): Promise<TAuth> {
        return this.authService.signup(dto);
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body() dto: AuthSigninDto): Promise<TAuth> {
        return this.authService.signin(dto);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(@Body() dto: RefreshDto): Promise<TAuth> {
        return this.authService.refreshTokens(dto.userId, dto.refreshToken);
    }
}
