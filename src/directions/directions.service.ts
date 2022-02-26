import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Directions } from './directions.entity';

@Injectable()
export class DirectionsService {
  constructor(
    @InjectRepository(Directions)
    private directionsResposity: Repository<Directions>,
  ) {}

  getDirections() {
    try {
      return this.directionsResposity.find({
        order: { directionName: 'ASC' },
      });
    } catch (_) {
      return new InternalServerErrorException();
    }
  }

  async createDirections(direction: Directions) {
    try {
      if (!direction.directionName || !direction.directionInfo)
        return new BadRequestException();

      const foundDirections = await this.directionsResposity.findOne({
        directionName: direction.directionName,
      });

      if (!foundDirections) {
        const newDirections = this.directionsResposity.create(direction);
        await this.directionsResposity.save(newDirections);

        return { message: 'Created' };
      } else {
        return {
          message: 'This title is already in use. Try another Directions title',
          status: 400,
        };
      }
    } catch (_) {
      return new InternalServerErrorException();
    }
  }

  async updateDirections(directions: Directions) {
    try {
      if (!directions.directionId) return new BadRequestException();

      const foundDirections = await this.directionsResposity.findOne({
        directionId: directions.directionId,
      });

      if (foundDirections) {
        if (directions.directionName)
          foundDirections.directionName = directions.directionName;
        if (directions.directionInfo)
          foundDirections.directionInfo = directions.directionInfo;
        await this.directionsResposity.save(foundDirections);

        return { message: 'Updated' };
      } else {
        return {
          message: 'This title is already in use. Try another Directions title',
          status: 400,
        };
      }
    } catch (_) {
      return new InternalServerErrorException();
    }
  }

  async deleteDirections(id: string) {
    try {
      if (!id) return new BadRequestException();
      const foundDirections = await this.directionsResposity.findOne({
        directionId: id,
      });

      await this.directionsResposity.remove(foundDirections);
      return { message: 'Deleted' };
    } catch (_) {
      return new InternalServerErrorException();
    }
  }
}
