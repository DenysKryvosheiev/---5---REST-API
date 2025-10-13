import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Room } from './Room';
import { Tariff } from './Tariff';

@Entity({ name: 'Тариф_Кімната' })
export class TariffRoom {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;

  @Column({ type: 'date', name: 'Дата застосування' })
  startDate: Date;

  @Column({ type: 'date', name: 'Дата закінчення', nullable: true })
  endDate?: Date;

  @ManyToOne(() => Room, (r) => r.tariffRooms, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  room: Room;

  @ManyToOne(() => Tariff, (t) => t.tariffRooms, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  tariff: Tariff;
}
