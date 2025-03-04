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
            map((response) => {
                // Định dạng lại nếu response có dữ liệu phân trang
                const isPaginated =
                    response &&
                    typeof response === 'object' &&
                    'data' in response &&
                    'meta' in response;

                if (isPaginated) {
                    return {
                        statusCode: context.switchToHttp().getResponse()
                            .statusCode,
                        data: response.data,
                        meta: {
                            ...response.meta,
                        },
                        message: 'Request successful',
                    };
                }

                // Định dạng lại response bình thường
                return {
                    statusCode: context.switchToHttp().getResponse().statusCode,
                    data: response,
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
