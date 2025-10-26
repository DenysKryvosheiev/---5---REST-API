import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Room } from './Room';
import { Student } from './Student';

@Entity({ name: 'Історія кімнат студента' })
export class StudentRoomHistory {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;

  @Column({ type: 'date', name: 'Дата_заселення' })
  moveInDate: Date;

  @Column({ type: 'date', name: 'Дата_виселення', nullable: true })
  moveOutDate?: Date;

  @ManyToOne(() => Room, (r) => r.histories, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  room: Room;

  @ManyToOne(() => Student, (s) => s.histories, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  student: Student;
}
