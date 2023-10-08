import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActiveStatusEnum } from 'src/commom/enum/enum';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video) private videoRepository: Repository<Video>,
  ) {}

  async create(createCourseDto: CreateVideoDto) {
    const course = this.videoRepository.create(createCourseDto);
    await this.videoRepository.save(course);
    return course;
  }
  
  findAll() {
    return this.videoRepository.find();
  }

  async findOne(id: number) {
    const course = await this.videoRepository.findOneBy({id: id});
    return course;
  }

  async update(id: number, updateCourseDto: UpdateVideoDto) {
    const event = await this.videoRepository.findOneBy({id: id})
    const eventUpdated = await this.videoRepository.save(
      Object.assign(event, updateCourseDto),
    );
    return eventUpdated;
  }

  remove(id: number) {
    this.videoRepository.update(id, {
      status: ActiveStatusEnum.INATIVE,
    });
    return;
  }
}
