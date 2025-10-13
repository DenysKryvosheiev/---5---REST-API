import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { CompensationRequest } from './CompensationRequest';
import { RepairRequest } from './RepairRequest';

@Entity({ name: 'Технічний персонал' })
export class TechnicalStaff {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;

  @Column({ type: 'date', name: 'Дата' })
  date: Date;

  @Column({ name: 'Номер телефону' })
  phoneNumber: string;

  @Column({ name: 'По-батькові' })
  middleName: string;

  @Column({ name: 'Прізвище' })
  lastName: string;

  @Column({ name: "Ім'я" })
  firstName: string;

  @Column({ type: 'text', name: 'Спеціалізація' })
  specialization: string;

  @OneToMany(() => RepairRequest, (r) => r.technicalStaff)
  repairRequests: RepairRequest[];

  @OneToMany(() => CompensationRequest, (c) => c.technicalStaff)
  compensationRequests: CompensationRequest[];
}
