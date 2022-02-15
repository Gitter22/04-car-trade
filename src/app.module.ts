import { ConfigModule, ConfigService } from '@nestjs/config';
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity'
const cookieSession = require('cookie-session')
import { APP_PIPE } from '@nestjs/core';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `./src/.${process.env.NODE_ENV}.env`
  }), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return {
        type: 'sqlite',
        database: config.get('DB_NAME'),
        synchronize: true, //never set it to true in production environment/once app is deployed
        entities: [User, Report],
      }
    }
  }), UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService, ConfigService, {
    provide: APP_PIPE,
    useValue: new ValidationPipe({ whitelist: true })
  }],
})
export class AppModule {
  constructor(private configService: ConfigService) { }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      cookieSession({
        keys: [this.configService.get('COOKIE_KEY')]
      })
    ).forRoutes('*')
  }
}

// TypeOrmModule.forRootAsync({
//   inject: [ConfigService],
//   useFactory: (config: ConfigService) => {
//     return {
//       type: 'sqlite',
//       database: 'db.sqlite',
//       synchronize: true, //never set it to true in production environment/once app is deployed
//       entities: [User, Report],
//     }
//   }
// })