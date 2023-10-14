import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { CourseService } from 'src/course/course.service';
import { Course } from 'src/course/entities/course.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersEntity } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Video]),
    TypeOrmModule.forFeature([Course]),
    TypeOrmModule.forFeature([UsersEntity]),
    AuthModule
  ],
  controllers: [VideosController],
  providers: [VideosService, CourseService, AuthService, UsersService, JwtService],
})
export class VideosModule {}
