import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Director } from './director.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthMiddleware } from './auth.middleware';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Director]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload/',
      }),
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  providers: [DirectorService],
  controllers: [DirectorController],
})
export class DirectorModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'news', method: RequestMethod.POST },
        { path: 'news', method: RequestMethod.PUT },
        { path: 'news/*', method: RequestMethod.DELETE },
        { path: 'poster', method: RequestMethod.POST },
        { path: 'poster', method: RequestMethod.PUT },
        { path: 'poster/*', method: RequestMethod.DELETE },
        { path: 'director/create', method: RequestMethod.POST },
        { path: 'directions', method: RequestMethod.POST },
        { path: 'directions', method: RequestMethod.PUT },
        { path: 'directions/*', method: RequestMethod.DELETE },
      );
  }
}
