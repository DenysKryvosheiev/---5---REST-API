import { getRepository } from 'typeorm';

import { Room } from '../orm/entities/Room';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class RoomService {
  private roomRepository = getRepository(Room);

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  async findOneOrFail(roomNumber: number): Promise<Room> {
    if (isNaN(roomNumber)) {
      throw new CustomError(400, 'Validation', 'Некоректний номер кімнати');
    }

    const room = await this.roomRepository.findOne({ where: { roomNumber } });
    if (!room) {
      throw new CustomError(404, 'Validation', `Кімнату ${roomNumber} не знайдено`);
    }

    return room;
  }

  async create(data: Partial<Room>): Promise<Room> {
    if (!data.roomNumber || !data.places || !data.area) {
      throw new CustomError(400, 'Validation', 'Всі поля кімнати є обов’язковими');
    }

    const exists = await this.roomRepository.findOne({ where: { roomNumber: data.roomNumber } });
    if (exists) {
      throw new CustomError(400, 'Validation', `Кімната ${data.roomNumber} вже існує`);
    }

    const room = this.roomRepository.create(data);
    return this.roomRepository.save(room);
  }

  async update(roomNumber: number, data: Partial<Room>): Promise<Room> {
    const room = await this.findOneOrFail(roomNumber);

    Object.assign(room, data);
    return this.roomRepository.save(room);
  }

  async delete(roomNumber: number): Promise<void> {
    const room = await this.findOneOrFail(roomNumber);
    await this.roomRepository.remove(room);
  }
}
