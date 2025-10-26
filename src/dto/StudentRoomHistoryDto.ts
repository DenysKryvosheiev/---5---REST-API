import { StudentRoomHistory } from '../orm/entities/StudentRoomHistory';

import { RoomDto } from './RoomDto';
import { StudentDto } from './StudentDto';

export class StudentRoomHistoryDto {
  id: number;
  moveInDate: string;
  moveOutDate?: string | null;
  room?: RoomDto | null;
  student?: StudentDto | null;

  constructor(history: StudentRoomHistory) {
    this.id = history.id;
    this.moveInDate = this.formatDate(history.moveInDate);
    this.moveOutDate = history.moveOutDate ? this.formatDate(history.moveOutDate) : null;
    this.room = history.room ? new RoomDto(history.room) : null;
    this.student = history.student ? new StudentDto(history.student) : null;
  }
  private formatDate(date: Date | string): string {
    if (!date) return '';
    if (typeof date === 'string') {
      return date;
    }
    return date.toISOString().split('T')[0];
  }
}
