import { Room } from '../orm/entities/Room';

export class RoomDto {
  roomNumber: number;
  places: number;
  area: number;

  constructor(room: Room) {
    this.roomNumber = room.roomNumber;
    this.places = room.places;
    this.area = room.area;
  }
}
