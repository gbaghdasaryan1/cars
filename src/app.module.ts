import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`
    })
    ,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "1346792846Gg!" ,
        database: 'nest',
        entities: [User,Report],
        synchronize: true,
      })
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {

  constructor(private configService: ConfigService){}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get("COOKIE_KEY")],
        }),
      )
      .forRoutes('*');
  }
}
   