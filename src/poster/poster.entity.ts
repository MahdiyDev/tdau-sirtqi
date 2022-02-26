import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Poster {
  @PrimaryGeneratedColumn('uuid', { name: 'poster_id' })
  posterId: string;
  @Column({ name: 'poster_title', nullable: false })
  posterTitle: string;
  @Column({ name: 'poster_info', nullable: false })
  posterinfo: string;
  @Column('timestamp without time zone', {
    name: 'poster_date',
    default: new Date(),
  })
  posterDate: Date;
}
