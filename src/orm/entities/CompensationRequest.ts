import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TechnicalStaff } from './TechnicalStaff';
import { RequestStatus } from './RequestStatus';

@Entity({ name: 'Заява на компенсацію коштів' })
export class CompensationRequest {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;

  @Column({ type: 'date', name: 'Дата' })
  date: Date;

  @Column({ type: 'jsonb', name: 'КвитанціЇ витрат' })
  expenseReceipts: any;

  @Column({ type: 'text', name: 'Призначення' })
  purpose: string;

  @Column({ type: 'enum', enum: RequestStatus, name: 'Статус' })
  status: RequestStatus;

  @ManyToOne(() => TechnicalStaff, (t) => t.compensationRequests, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  technicalStaff: TechnicalStaff;
}
