import { getRepository } from 'typeorm';

import { Room } from '../orm/entities/Room';
import { Student } from '../orm/entities/Student';
import { StudentRoomHistory } from '../orm/entities/StudentRoomHistory';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class HistoryService {
  private historyRepo = getRepository(StudentRoomHistory);
  private studentRepo = getRepository(Student);
  private roomRepo = getRepository(Room);

  async findAll(): Promise<StudentRoomHistory[]> {
    return this.historyRepo.find({
      relations: ['student', 'room'],
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<StudentRoomHistory> {
    if (!id || isNaN(id)) {
      throw new CustomError(400, 'Validation', 'Некоректний ID', null, null, [{ id: 'ID має бути числом' }]);
    }

    const history = await this.historyRepo.findOne({
      where: { id },
      relations: ['student', 'room'],
    });

    if (!history) {
      throw new CustomError(404, 'General', 'Історію не знайдено', null, null, [
        { id: 'Історію із вказаним ID не знайдено' },
      ]);
    }

    return history;
  }

  async create(data: any): Promise<StudentRoomHistory> {
    const validationErrors: Record<string, string>[] = [];

    if (!data.moveInDate) validationErrors.push({ moveInDate: "Поле 'Дата заселення' є обов’язковим" });
    if (!data.student) validationErrors.push({ student: "Поле 'Студент' є обов’язковим" });
    if (!data.room) validationErrors.push({ room: "Поле 'Кімната' є обов’язковим" });

    if (validationErrors.length > 0) {
      throw new CustomError(400, 'Validation', 'Помилка валідації історії проживання', null, null, validationErrors);
    }

    const student =
      typeof data.student === 'object'
        ? await this.studentRepo.findOne({ where: { id: data.student.id } })
        : await this.studentRepo.findOne({ where: { id: data.student } });

    if (!student) {
      throw new CustomError(400, 'Validation', 'Студента не знайдено', null, null, [
        { student: 'Студента з таким ID не знайдено' },
      ]);
    }

    let room: Room | undefined;

    if (data.roomId) {
      room = await this.roomRepo.findOne({ where: { id: data.roomId } });
    } else if (data.roomNumber) {
      room = await this.roomRepo.findOne({ where: { roomNumber: data.roomNumber } });
    } else if (typeof data.room === 'object') {
      if (data.room.id) {
        room = await this.roomRepo.findOne({ where: { id: data.room.id } });
      } else if (data.room.roomNumber) {
        room = await this.roomRepo.findOne({ where: { roomNumber: data.room.roomNumber } });
      }
    } else if (typeof data.room === 'number') {
      room = await this.roomRepo.findOne({ where: { roomNumber: data.room } });
    }

    if (!room) {
      throw new CustomError(400, 'Validation', 'Кімнату не знайдено', null, null, [
        { room: 'Кімнату з таким номером або ID не знайдено' },
      ]);
    }

    const moveInDate = new Date(data.moveInDate);
    const moveOutDate = data.moveOutDate ? new Date(data.moveOutDate) : null;

    if (moveOutDate && moveOutDate < moveInDate) {
      throw new CustomError(400, 'Validation', 'Дата виселення не може бути раніше заселення', null, null, [
        { moveOutDate: 'Дата виселення не може бути раніше дати заселення' },
      ]);
    }

    const record = this.historyRepo.create({
      moveInDate,
      moveOutDate,
      student,
      room,
    });

    const saved = await this.historyRepo.save(record);
    return this.findOne(saved.id);
  }

  async update(id: number, data: Partial<StudentRoomHistory>): Promise<StudentRoomHistory> {
    const existing = await this.historyRepo.findOne({ where: { id } });
    if (!existing) {
      throw new CustomError(404, 'General', 'Історію не знайдено', null, null, [
        { id: 'Історію із вказаним ID не знайдено' },
      ]);
    }

    if (data.moveOutDate && new Date(data.moveOutDate) < new Date(existing.moveInDate)) {
      throw new CustomError(400, 'Validation', 'Дата виселення не може бути раніше заселення', null, null, [
        { moveOutDate: 'Дата виселення не може бути раніше дати заселення' },
      ]);
    }

    Object.assign(existing, data);
    await this.historyRepo.save(existing);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const result = await this.historyRepo.delete(id);
    if (result.affected === 0) {
      throw new CustomError(404, 'General', 'Історію не знайдено', null, null, [
        { id: 'Історію із вказаним ID не знайдено' },
      ]);
    }
  }
}
