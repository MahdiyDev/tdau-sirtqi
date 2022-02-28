import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Director } from './director.entity';
import { DirectorService } from './director.service';

@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Get(':type')
  getDirectorByType(@Param('type') type: string) {
    return this.directorService.getDirectorByType(type);
  }

  @Get('image/:image')
  getProfilePhoto(@Param('image') image: string, @Res() res: any) {
    return this.directorService.getProfilePhoto(image, res);
  }

  @Post('login')
  login(@Body() director: Director) {
    return this.directorService.login(director);
  }

  @Post('create')
  @UseInterceptors(FilesInterceptor('file'))
  createDirector(
    @Body() director: Director,
    @UploadedFiles() file: Express.Multer.File,
  ) {
    return this.directorService.createDirector(director, file);
  }
}
