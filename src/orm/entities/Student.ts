import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StudentRoomHistory } from './StudentRoomHistory';
import { LivingReceipt } from './LivingReceipt';
import { Payment } from './Payment';
import { EvictionRequest } from './EvictionRequest';
import { RepairRequest } from './RepairRequest';

@Entity({ name: 'Студент' })
export class Student {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;

  @Column({ type: 'date', name: 'Дата народження' })
  birthDate: Date;

  @Column({ type: 'date', name: 'Дата реєстрації' })
  registrationDate: Date;

  @Column({ name: 'Номер студентського квитка' })
  studentCardNumber: string;

  @Column({ name: 'Номер телефону' })
  phoneNumber: string;

  @Column({ name: 'Прізвище' })
  lastName: string;

  @Column({ name: 'По-батькові' })
  middleName: string;

  @Column({ name: 'Ім\'я' })
  firstName: string;

  @Column({ name: 'Пільги', nullable: true })
  benefits?: string;

  @OneToMany(() => StudentRoomHistory, (h) => h.student)
  histories: StudentRoomHistory[];

  @OneToMany(() => LivingReceipt, (r) => r.student)
  receipts: LivingReceipt[];

  @OneToMany(() => Payment, (p) => p.student)
  payments: Payment[];

  @OneToMany(() => EvictionRequest, (e) => e.student)
  evictionRequests: EvictionRequest[];

  @OneToMany(() => RepairRequest, (r) => r.student)
  repairRequests: RepairRequest[];
}
