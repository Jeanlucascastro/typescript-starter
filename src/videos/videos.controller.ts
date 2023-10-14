import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/strategies/adm.strategy';

@Controller('videos')
@UseGuards(AuthGuard('jwt'))
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.videosService.findAll();
  }

  @Get('by-course/:id')
  findAllByCourse(@Param('id') id: number) {
    return this.videosService.findAllByCourse(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}
