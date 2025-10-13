import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Student } from './Student';
import { Room } from './Room';

@Entity({ name: 'Історія кімнат студента' })
export class StudentRoomHistory {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;

  @Column({ type: 'date', name: 'Дата заселення' })
  moveInDate: Date;

  @Column({ type: 'date', name: 'Дата виселення', nullable: true })
  moveOutDate?: Date;

  @ManyToOne(() => Room, (r) => r.histories, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  room: Room;

  @ManyToOne(() => Student, (s) => s.histories, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  student: Student;
}
