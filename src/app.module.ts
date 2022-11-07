import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DbModule,
    AuthModule,
    EventModule,
    UserModule
  ],
})
export class AppModule {}
