import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from './Student';

export enum PaymentStatus {
  Paid = 'Оплачено',
  Partial = 'Часткова оплата',
  Debt = 'Борг',
}

@Entity({ name: 'Квитанція на проживання' })
export class LivingReceipt {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;

  @Column({ type: 'date', name: 'Дата' })
  date: Date;

  @Column({ type: 'date', name: 'Період' })
  period: Date;

  @Column({ type: 'enum', enum: PaymentStatus, name: 'Статус оплати' })
  status: PaymentStatus;

  @ManyToOne(() => Student, (s) => s.receipts, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  student: Student;
}
