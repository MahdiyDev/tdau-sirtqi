import { Module } from '@nestjs/common';
import { DirectionsService } from './directions.service';
import { DirectionsController } from './directions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Directions } from './directions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Directions])],
  providers: [DirectionsService],
  controllers: [DirectionsController],
})
export class DirectionsModule {}
