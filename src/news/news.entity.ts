import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn('uuid', { name: 'news_id' })
  newsId: string;
  @Column({ name: 'news_title', nullable: false })
  newsTitle: string;
  @Column({ name: 'news_des', nullable: false })
  newsDes: string;
  @Column('timestamp without time zone', {
    name: 'news_date',
    default: new Date(),
  })
  newsDate: Date;
}
