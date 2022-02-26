import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Director } from './director.entity';
import { DirectorService } from './director.service';

@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Get(':type')
  getDirectorByType(@Param('type') type: string) {
    return this.directorService.getDirectorByType(type);
  }

  @Post('login')
  login(@Body() director: Director) {
    return this.directorService.login(director);
  }

  @Post('create')
  createDirector(@Body() director: Director) {
    return this.directorService.createDirector(director);
  }
}
