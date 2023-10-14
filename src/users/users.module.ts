import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
