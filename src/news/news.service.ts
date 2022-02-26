import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsResposity: Repository<News>,
  ) {}

  getNews() {
    try {
      return this.newsResposity.find({ order: { newsDate: 'DESC' } });
    } catch (_) {
      return new InternalServerErrorException();
    }
  }

  async createNews(news: News) {
    try {
      if (!news.newsTitle || !news.newsDes) return new BadRequestException();

      const foundNews = await this.newsResposity.findOne({
        newsTitle: news.newsTitle,
      });

      if (!foundNews) {
        const newNews = this.newsResposity.create(news);
        await this.newsResposity.save(newNews);

        return { message: 'Created' };
      } else {
        return {
          message: 'This title is already in use. Try another news title',
          status: 400,
        };
      }
    } catch (_) {
      return new InternalServerErrorException();
    }
  }

  async updateNews(news: News) {
    try {
      if (!news.newsId) return new BadRequestException();

      const foundNews = await this.newsResposity.findOne({
        newsId: news.newsId,
      });

      if (foundNews) {
        if (news.newsTitle) foundNews.newsTitle = news.newsTitle;
        if (news.newsDes) foundNews.newsDes = news.newsDes;
        await this.newsResposity.save(foundNews);

        return { message: 'Updated' };
      } else {
        return {
          message: 'This title is already in use. Try another news title',
          status: 400,
        };
      }
    } catch (_) {
      return new InternalServerErrorException();
    }
  }

  async deleteNews(id: string) {
    try {
      if (!id) return new BadRequestException();
      const foundNews = await this.newsResposity.findOne({
        newsId: id,
      });

      await this.newsResposity.remove(foundNews);
      return { message: 'Deleted' };
    } catch (_) {
      return new InternalServerErrorException();
    }
  }
}
