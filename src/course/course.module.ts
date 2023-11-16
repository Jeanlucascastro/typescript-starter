import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from 'src/users/users.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Course]),
    CourseModule,
    AuthModule,
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  exports: [CourseService], 
  controllers: [CourseController],
  providers: [CourseService, AuthService, UsersService, JwtService]
})
export class CourseModule {}
