import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('varchar', {
    length: 255,
    unique: true,
    nullable: false,
    name: 'email',
  })
  email: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
    name: 'password',
  })
  password: string;
}
