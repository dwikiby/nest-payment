import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuards } from './guard/jwt.guard';
import { JwtStrategy } from './guard/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'topSecret52',
        signOptions: { expiresIn: '3600s'},
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuards, JwtStrategy],
})
export class AuthModule {}
