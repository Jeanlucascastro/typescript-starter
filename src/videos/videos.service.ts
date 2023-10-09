import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Video } from "./entities/video.entity";
import { Course } from "src/course/entities/course.entity";
import { Repository } from "typeorm";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { ActiveStatusEnum } from "src/commom/enum/enum";


@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video) private readonly videoRepository: Repository<Video>,
    @InjectRepository(Course) private readonly courseRepository: Repository<Course>
  ) {}

  async create(createCourseDto: CreateVideoDto) {
    const video = this.videoRepository.create(createCourseDto);
    const course = await this.courseRepository.findOneBy({id: createCourseDto.courseId})
    video.course = course;
    await this.videoRepository.save(video);
    return video;
  }
  
  findAll() {
    return this.videoRepository.find();
  }

  async findOne(id: number) {
    const video = await this.videoRepository.findOneBy({id: id});
    return video;
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
