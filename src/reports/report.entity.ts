import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column({default: false})
  approved: boolean;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  mileage: number;

  @ManyToOne(() => User, (user) => user.reports)
  user: User

}
