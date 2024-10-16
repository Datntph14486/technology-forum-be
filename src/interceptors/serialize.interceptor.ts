import * as _ from 'lodash';

import {
    CallHandler,
    ExecutionContext,
    HttpException,
    HttpStatus,
    NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
    constructor() {}

    getStatus(err) {
        return _.get(err, 'status') || HttpStatus.SERVICE_UNAVAILABLE;
    }

    getErrorMessage(err) {
        return _.get(err, 'response.message') || 'Service unavailable';
    }

    getError(err) {
        return _.get(err, 'response.error') || err;
    }

    errorResponse(err) {
        console.log('🚀 ~ err:', err);
        const statusCode = this.getStatus(err);
        const message = this.getErrorMessage(err);
        const error = this.getError(err);
        const data = _.get(err, 'response.data');

        return {
            error: {
                statusCode,
                message,
                error,
                data,
                time: new Date(),
            },
        };
    }

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        console.log('1');
        return next.handle().pipe(
            map((data: any) => {
                const statusCode =
                    context.switchToHttp().getResponse().statusCode ||
                    HttpStatus.OK;

                return {
                    statusCode,
                    data,
                    message: 'Request successful',
                };
            }),
            catchError((err) => {
                return throwError(() => {
                    const errorResponse = this.errorResponse(err);

                    return new HttpException(
                        errorResponse,
                        errorResponse.error.statusCode,
                    );
                });
            }),
        );
    }
}
