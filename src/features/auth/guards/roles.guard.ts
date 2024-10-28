import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { COMMON_MESSAGE } from 'src/common/constants';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get(Roles, context.getHandler());

        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const userRole = request['role'];

        if (!roles.some((p) => userRole === p))
            throw new ForbiddenException(COMMON_MESSAGE.FORBIDDEN);

        return true;
    }
}
