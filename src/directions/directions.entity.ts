import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Directions {
  @PrimaryGeneratedColumn('uuid', { name: 'direction_id' })
  directionId: string;
  @Column({ name: 'direction_name', nullable: false })
  directionName: string;
  @Column({ name: 'direction_info', nullable: false })
  directionInfo: string;
  @Column('timestamp without time zone', {
    name: 'direction_date',
    default: new Date(),
  })
  directionDate: Date;
}
