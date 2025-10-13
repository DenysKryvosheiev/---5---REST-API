import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { RequestStatus } from './RequestStatus';
import { Student } from './Student';

@Entity({ name: 'Заява на виселення' })
export class EvictionRequest {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;

  @Column({ type: 'date', name: 'Дата' })
  date: Date;

  @Column({ type: 'text', name: 'Повідомлення' })
  message: string;

  @Column({ type: 'enum', enum: RequestStatus, name: 'Статус' })
  status: RequestStatus;

  @ManyToOne(() => Student, (s) => s.evictionRequests, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  student: Student;
}
