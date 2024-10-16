import { AuthService } from './../auth.service';
import {
    CanActivate,
    ExecutionContext,
    Inject,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { COMMON_MESSAGE, TOKEN_TYPE } from 'src/common/constants';

export class JwtAuthGuard implements CanActivate {
    private authService: AuthService;

    constructor() {
        // this.authService = new AuthService();
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request: Request): Promise<boolean> {
        try {
            const token = this.extractTokenFromHeader(request);

            if (!token) {
                throw new UnauthorizedException(COMMON_MESSAGE.TOKEN_INVALID);
            }
            console.log(1);

            const secretKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

            const payload = await this.authService.verifyToken(
                token,
                TOKEN_TYPE.ACCESS_TOKEN,
            );

            if (!payload) {
                throw new UnauthorizedException(COMMON_MESSAGE.TOKEN_INVALID);
            }

            request['user'] = payload;

            return true;
        } catch (error) {
            console.log('🚀 ~ error:', error);
            throw new UnauthorizedException(COMMON_MESSAGE.TOKEN_INVALID);
        }
    }
    extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }
}
