import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from './Student';
import { TechnicalStaff } from './TechnicalStaff';
import { RequestStatus } from './RequestStatus';

@Entity({ name: 'Заява на ремонт' })
export class RepairRequest {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;

  @Column({ type: 'date', name: 'Дата' })
  date: Date;

  @Column({ type: 'text', name: 'Повідомлення' })
  message: string;

  @Column({ type: 'enum', enum: RequestStatus, name: 'Статус' })
  status: RequestStatus;

  @ManyToOne(() => Student, (s) => s.repairRequests, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  student: Student;

  @ManyToOne(() => TechnicalStaff, (t) => t.repairRequests, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  technicalStaff: TechnicalStaff;

  @Column({ type: 'date', name: 'Дата виконання', nullable: true })
  completionDate?: Date;
}
