import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

import { FurnitureRoom } from './FurnitureRoom';
import { StudentRoomHistory } from './StudentRoomHistory';
import { TariffRoom } from './TariffRoom';

@Entity({ name: 'Кімната' })
export class Room {
  @PrimaryColumn({ type: 'smallint', name: 'Номер кімнати' })
  roomNumber: number;

  @Column({ type: 'smallint', name: 'Місця' })
  places: number;

  @Column({ type: 'double precision', name: 'Площа кімнати' })
  area: number;

  @OneToMany(() => FurnitureRoom, (fr) => fr.room)
  furnitureRooms: FurnitureRoom[];

  @OneToMany(() => TariffRoom, (tr) => tr.room)
  tariffRooms: TariffRoom[];

  @OneToMany(() => StudentRoomHistory, (h) => h.room)
  histories: StudentRoomHistory[];
}
