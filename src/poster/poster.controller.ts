import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Poster } from './poster.entity';
import { PosterService } from './poster.service';

@Controller('poster')
export class PosterController {
  constructor(private readonly posterService: PosterService) {}

  @Get()
  getPoster() {
    return this.posterService.getPoster();
  }

  @Get(':file')
  getFile(@Param('file') file: string, @Res() res: any) {
    return this.posterService.getFile(file, res);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('file'))
  createPoster(
    @Body() poster: Poster,
    @UploadedFiles() file: Express.Multer.File,
  ) {
    return this.posterService.createPoster(poster, file);
  }

  @Put()
  @UseInterceptors(FilesInterceptor('file'))
  updatePoster(
    @Body() poster: Poster,
    @UploadedFiles() file: Express.Multer.File,
  ) {
    return this.posterService.updatePoster(poster, file);
  }

  @Delete(':id')
  deletePoster(@Param('id') id: string) {
    return this.posterService.deletePoster(id);
  }
}
