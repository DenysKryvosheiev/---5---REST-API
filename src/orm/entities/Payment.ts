import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { PaymentStatus } from './LivingReceipt';
import { Student } from './Student';

@Entity({ name: 'Оплата' })
export class Payment {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;

  @Column({ type: 'date', name: 'Дата' })
  date: Date;

  @Column({ type: 'jsonb', name: 'Квитанція оплати' })
  paymentReceipt: any;

  @Column({ type: 'date', name: 'Період' })
  period: Date;

  @Column({ type: 'enum', enum: PaymentStatus, name: 'Статус' })
  status: PaymentStatus;

  @Column({ type: 'integer', name: 'Сума' })
  amount: number;

  @ManyToOne(() => Student, (s) => s.payments, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  student: Student;
}
