import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users', schema: 'auth', synchronize: false })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
