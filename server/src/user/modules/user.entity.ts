import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  mobile: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  password: string;
  @Column()
  email: string;
}
