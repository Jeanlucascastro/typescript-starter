import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { ActiveStatusEnum } from 'src/commom/enum/enum';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}
  
  async create(createCourseDto: CreateCourseDto) {
    const course = this.courseRepository.create(createCourseDto);
    await this.courseRepository.save(course);
    return course;
  }
  
  findAll() {
    return this.courseRepository.find();
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOneBy({id: id});
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const event = await this.courseRepository.findOneBy({id: id})
    const eventUpdated = await this.courseRepository.save(
      Object.assign(event, updateCourseDto),
    );
    return eventUpdated;
  }

  remove(id: number) {
    this.courseRepository.update(id, {
      status: ActiveStatusEnum.INATIVE,
    });
    return;
  }
}
