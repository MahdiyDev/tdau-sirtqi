import { Module } from '@nestjs/common';
import { PosterService } from './poster.service';
import { PosterController } from './poster.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poster } from './poster.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Poster]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload/',
      }),
    }),
  ],
  providers: [PosterService],
  controllers: [PosterController],
})
export class PosterModule {}
