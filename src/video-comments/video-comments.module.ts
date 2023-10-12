import { Module } from '@nestjs/common';
import { VideoCommentsService } from './video-comments.service';
import { VideoCommentsController } from './video-comments.controller';
import { VideoComment } from './entities/video-comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Video } from 'src/videos/entities/video.entity';
import { VideosService } from 'src/videos/videos.service';
import { Course } from 'src/course/entities/course.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Video]),
    TypeOrmModule.forFeature([VideoComment]),
    TypeOrmModule.forFeature([Course]),
  ],
  controllers: [VideoCommentsController],
  providers: [VideoCommentsService, VideosService],
})
export class VideoCommentsModule {}
