import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { FurnitureRoom } from './FurnitureRoom';

@Entity({ name: 'Меблі' })
export class Furniture {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;

  @Column({ name: 'Назва' })
  name: string;

  @Column({ name: 'Опис', type: 'text', nullable: true })
  description?: string;

  @OneToMany(() => FurnitureRoom, (fr) => fr.furniture)
  furnitureRooms: FurnitureRoom[];
}
