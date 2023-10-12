import { Injectable } from '@nestjs/common';
import { CreateVideoCommentDto } from './dto/create-video-comment.dto';
import { UpdateVideoCommentDto } from './dto/update-video-comment.dto';
import { VideoComment } from './entities/video-comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from 'src/videos/entities/video.entity';
import { ActiveStatusEnum } from 'src/commom/enum/enum';

@Injectable()
export class VideoCommentsService {
  constructor(
    @InjectRepository(VideoComment) private readonly videoCommentRepository: Repository<VideoComment>,
    @InjectRepository(Video) private readonly videoRepository: Repository<Video>,
  ) {}

  async create(createVideoCommentDto: CreateVideoCommentDto) {
    const videoComment = this.videoCommentRepository.create(createVideoCommentDto);
    const video = await this.videoRepository.findOneBy({id: createVideoCommentDto.videoId})
    videoComment.video = video;
    await this.videoCommentRepository.save(videoComment);
    return videoComment;
  }

  findAll() {
    return this.videoCommentRepository.find();
  }

  findAllByVideo(id: number) {
    return this.videoCommentRepository.find({ where: { video: { id: id } } })
  }

  async findOne(id: number) {
    const videoComment = await this.videoCommentRepository.findOneBy({id: id})
    return videoComment;
  }

  async update(id: number, updateVideoCommentDto: UpdateVideoCommentDto) {
    const videoComment = await this.videoCommentRepository.findOneBy({id: id})
    const videoCommentUpdated = await this.videoCommentRepository.save(
      Object.assign(videoComment, updateVideoCommentDto)
    )
    return videoCommentUpdated;
  }

  remove(id: number) {
    this.videoRepository.update(id, {
      status: ActiveStatusEnum.INATIVE,
    });
    return;
  }
}
