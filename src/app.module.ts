import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './modules/player/player.module';
import { HttpErrorFilter } from './shared/processing/http-error.filter';
import { LoggingInterceptor } from './shared/processing/logging.interceptor';
import { GameModule } from './modules/game/game.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [TypeOrmCoreModule.forRoot(), PlayerModule, GameModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
