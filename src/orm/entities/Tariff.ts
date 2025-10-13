import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TariffRoom } from './TariffRoom';

@Entity({ name: 'Тариф' })
export class Tariff {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;

  @Column({ type: 'date', name: 'Запровадження тарифу' })
  startDate: Date;

  @Column({ type: 'integer', name: 'Сума' })
  amount: number;

  @OneToMany(() => TariffRoom, (tr) => tr.tariff)
  tariffRooms: TariffRoom[];
}
