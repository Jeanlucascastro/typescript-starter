import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoDto } from './create-video.dto';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
    name: string;
    url: string;
    ordering: number;
    courseId: number;
}
