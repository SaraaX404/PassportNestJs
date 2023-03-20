import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  providers: [AuthService, LocalStrategy, SessionSerializer],
  imports: [
    UsersModule,
    PassportModule,
    PassportModule.register({ session: true }),
  ],
})
export class AuthModule {}
