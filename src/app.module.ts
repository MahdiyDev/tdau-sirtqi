import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { NewsModule } from './news/news.module';
import { PosterModule } from './poster/poster.module';
import { DirectionsModule } from './directions/directions.module';
import { DirectorModule } from './director/director.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    NewsModule,
    PosterModule,
    DirectionsModule,
    DirectorModule,
  ],
})
export class AppModule {}
