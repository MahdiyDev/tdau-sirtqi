import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path/posix';
import { Repository } from 'typeorm';
import { Poster } from './poster.entity';
import * as fs from 'fs';

@Injectable()
export class PosterService {
  constructor(
    @InjectRepository(Poster)
    private posterResposity: Repository<Poster>,
  ) {}

  getPoster() {
    try {
      return this.posterResposity.find({ order: { posterDate: 'DESC' } });
    } catch (_) {
      return new InternalServerErrorException();
    }
  }

  getFile(file: string, res: any) {
    try {
      return res.sendFile(join(process.cwd(), 'upload/' + file));
    } catch (_) {
      return new InternalServerErrorException();
    }
  }

  async createPoster(poster: Poster, file: any) {
    try {
      const fileName = file[0].filename;
      if (!poster.posterTitle || !fileName) return new BadRequestException();

      const foundPoster = await this.posterResposity.findOne({
        posterTitle: poster.posterTitle,
      });

      if (!foundPoster) {
        const newPoster = this.posterResposity.create(poster);
        newPoster.posterinfo = fileName;
        await this.posterResposity.save(newPoster);

        return { message: 'Created' };
      } else {
        return {
          message: 'This title is already in use. Try another Poster title',
          status: 400,
        };
      }
    } catch (_) {
      return new InternalServerErrorException();
    }
  }

  async updatePoster(poster: Poster, file: any) {
    try {
      if (!poster.posterId) return new BadRequestException();

      const foundPoster = await this.posterResposity.findOne({
        posterId: poster.posterId,
      });

      if (foundPoster) {
        const fileName = file.length ? file[0].filename : undefined;
        if (poster.posterTitle) foundPoster.posterTitle = poster.posterTitle;
        if (fileName) foundPoster.posterinfo = fileName;
        await this.posterResposity.save(foundPoster);

        return { message: 'Updated' };
      } else {
        return {
          message: 'This title is already in use. Try another Poster title',
          status: 400,
        };
      }
    } catch (_) {
      return new InternalServerErrorException();
    }
  }

  async deletePoster(id: string) {
    try {
      if (!id) return new BadRequestException();
      const foundPoster = await this.posterResposity.findOne({
        posterId: id,
      });
      if (foundPoster) {
        fs.unlink(
          join(process.cwd(), 'upload/' + foundPoster.posterinfo),
          (err) => console.log(err),
        );
        await this.posterResposity.remove(foundPoster);
        return { message: 'Deleted' };
      } else {
        return { message: 'poster not found' };
      }
    } catch (_) {
      console.log(_);
      return new InternalServerErrorException();
    }
  }
}
