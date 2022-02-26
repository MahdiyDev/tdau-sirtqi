import { stringToHash } from 'src/hashCode';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Director {
  @PrimaryGeneratedColumn('uuid', { name: 'director_id' })
  directorId: string;
  @Column({ name: 'director_fullname', nullable: false })
  directonFullname: string;
  @Column({ name: 'director_tel', nullable: false })
  directorTel: string;
  @Column({ name: 'director_reception_time', nullable: false })
  directorReceptionTime: string;
  @Column({ name: 'director_type', nullable: false })
  directorType: string;
  @Column({ name: 'director_email', nullable: false })
  directorEmail: string;
  @Column({ name: 'director_password', nullable: false })
  directorPassword: string;
  @BeforeInsert()
  hashPassword() {
    this.directorPassword = stringToHash(this.directorPassword);
  }
}
