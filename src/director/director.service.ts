import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Director } from './director.entity';
import regexp from '../regexp';
import { JwtService } from '@nestjs/jwt';
import { stringToHash } from 'src/hashCode';
import { join } from 'path/posix';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(Director)
    private directorReposity: Repository<Director>,
    private jwtService: JwtService,
  ) {}

  async getDirectorByType(type: string) {
    try {
      const arr = [];
      const foundDirector = await this.directorReposity.find({
        directorType: type,
      });
      for (let i = 0; i < foundDirector.length; i++) {
        const {
          directorEmail,
          directorId,
          directonFullname,
          directorTel,
          directorReceptionTime,
          directorType,
          directorImage,
        } = foundDirector[i];

        arr.push({
          directorEmail,
          directorId,
          directonFullname,
          directorTel,
          directorReceptionTime,
          directorType,
          directorImage,
        });
      }
      return arr;
    } catch (_) {
      return new InternalServerErrorException();
    }
  }

  getProfilePhoto(image: string, res: any) {
    try {
      return res.sendFile(join(process.cwd(), 'upload/' + image));
    } catch (_) {
      return new InternalServerErrorException();
    }
  }

  async login(director: Director) {
    try {
      if (!director.directorEmail || !director.directorPassword)
        return new BadRequestException();

      const checkEmail = regexp.checkEmail(director.directorEmail);

      if (!checkEmail)
        return {
          message: 'The username must contain a special character',
          status: 400,
        };

      const checkPass = regexp.checkPassword(director.directorPassword);

      if (!checkPass)
        return {
          message:
            'The password must consist of at least one number and at least one special character',
          status: 400,
        };

      const hashPass = stringToHash(director.directorPassword);

      const foundDirector = await this.directorReposity.findOne({
        directorEmail: director.directorEmail,
        directorPassword: hashPass,
      });

      if (foundDirector) {
        const jwt = await this.jwtService.signAsync({
          id: foundDirector.directorId,
        });
        return { accessToken: 'Bearer ' + jwt };
      } else {
        return new UnauthorizedException();
      }
    } catch (_) {
      return new InternalServerErrorException();
    }
  }

  async createDirector(director: Director, file: any) {
    try {
      if (
        !director.directorEmail ||
        !director.directorPassword ||
        !director.directonFullname ||
        !director.directorReceptionTime ||
        !director.directorTel ||
        !director.directorType
      )
        return new BadRequestException();

      const checkEmail = regexp.checkEmail(director.directorEmail);

      if (!checkEmail)
        return {
          message: 'The username must contain a special character',
          status: 400,
        };

      const checkPass = regexp.checkPassword(director.directorPassword);

      if (!checkPass)
        return {
          message:
            'The password must consist of at least one number and at least one special character',
          status: 400,
        };

      const foundDirector = await this.directorReposity.findOne({
        directorEmail: director.directorEmail,
      });

      if (!foundDirector) {
        const fileName = file.length ? file[0].filename : undefined;
        const newDirector = this.directorReposity.create(director);
        if (fileName) newDirector.directorImage = fileName;
        await this.directorReposity.save(newDirector);
        return { message: 'Created' };
      } else {
        return {
          message: 'Try another email',
          status: 400,
        };
      }
    } catch (_) {
      return new InternalServerErrorException();
    }
  }

  async findDirector(id: string) {
    try {
      return await this.directorReposity.findOne({ directorId: id });
    } catch (_) {
      return undefined;
    }
  }
}
