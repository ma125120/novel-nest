import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { AnyExceptionFilter } from './common/filter/any-exception.filter';

import { ConfigModule } from '@nestjs/config';

enum EnvEnum {
  dev = 'dev',
  prod = 'prod',
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${EnvEnum[process.env.MY_ENV]}.env`,
    }),
    CacheModule.register({
      ttl: 5,
      max: 10,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
