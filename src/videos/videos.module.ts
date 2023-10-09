import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { CourseModule } from 'src/course/course.module';
import { CourseService } from 'src/course/course.service';
import { Course } from 'src/course/entities/course.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Video]),
    TypeOrmModule.forFeature([Course]),
  ],
  controllers: [VideosController],
  providers: [VideosService, CourseService],
})
export class VideosModule {}
