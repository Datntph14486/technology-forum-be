import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { COMMON_MESSAGE } from 'src/common/constants';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                // Định dạng lại response
                return {
                    statusCode: context.switchToHttp().getResponse().statusCode,
                    data,
                    message: 'Request successful',
                };
            }),
            catchError((err) => {
                // Xử lý lỗi và định dạng lại lỗi
                return throwError(() => ({
                    statusCode: err.status || 500,
                    message:
                        err.message ||
                        COMMON_MESSAGE.ERR_COM_007_InternalServerError,
                }));
            }),
        );
    }
}
