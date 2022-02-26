import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Directions } from './directions.entity';
import { DirectionsService } from './directions.service';

@Controller('directions')
export class DirectionsController {
  constructor(private readonly directionServise: DirectionsService) {}

  @Get()
  getDirections() {
    return this.directionServise.getDirections();
  }

  @Post()
  createDirection(@Body() direction: Directions) {
    return this.directionServise.createDirections(direction);
  }

  @Put()
  updateDirection(@Body() direction: Directions) {
    return this.directionServise.updateDirections(direction);
  }

  @Delete(':id')
  deleteDirection(@Param('id') id: string) {
    return this.directionServise.deleteDirections(id);
  }
}
