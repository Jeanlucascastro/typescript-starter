import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VideosModule } from './videos/videos.module';
import { VideoCommentsModule } from './video-comments/video-comments.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [CourseModule,
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
      autoLoadEntities: true,
    } as TypeOrmModuleOptions),
    ConfigModule.forRoot(),
    CourseModule,
    UsersModule,
    AuthModule,
    VideosModule,
    VideoCommentsModule,
    CompanyModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
