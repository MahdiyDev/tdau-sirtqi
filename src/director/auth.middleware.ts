import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { DirectorService } from './director.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly directorService: DirectorService,
    private jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const bearerHeader = req.headers['authorization'];
      if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        const { id } = await this.jwtService.verifyAsync(bearerToken);
        const user = await this.directorService.findDirector(id);
        if (!user) return res.status(401).json({ message: 'unauthorized' });
        req['user'] = user;
        next();
      } else {
        res.status(403).json({ message: 'Not Allowed', status: 403 });
      }
    } catch (_) {
      return new InternalServerErrorException();
    }
  }
}
