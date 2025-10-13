import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Room } from './Room';
import { Furniture } from './Furniture';

@Entity({ name: 'Меблі_Кімната' })
export class FurnitureRoom {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;

  @Column({ type: 'integer', name: 'Кількість' })
  quantity: number;

  @Column({ type: 'integer', name: 'Ціна' })
  price: number;

  @ManyToOne(() => Room, (r) => r.furnitureRooms, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  room: Room;

  @ManyToOne(() => Furniture, (f) => f.furnitureRooms, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  furniture: Furniture;
}
