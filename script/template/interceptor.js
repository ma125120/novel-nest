const { upper } = require('../util');

const create = name => {
  const upName = upper(name);
  return `
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, applyDecorators, UseInterceptors } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { transfromData, } from '@/common/decorator';
import { ${upName} } from './${name}.entity';

@Injectable()
export class ${upName}Interceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next
      .handle()
      .pipe(
        // tap((data) => {
        //   console.log(data)
        // }),
        map(res => transfromData(res, ${upName},))
      )
  }
}

export const Use${upName}Interceptor = () => {
  return applyDecorators(
    UseInterceptors(${upName}Interceptor),
  )
}
`;
};

module.exports = create;