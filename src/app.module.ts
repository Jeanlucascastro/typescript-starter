import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormService } from './config/typeorm/typeorm.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CourseModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
    ConfigModule.forRoot(),
    CourseModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
