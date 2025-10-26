import { Request, Response, NextFunction } from 'express';

import { RoomDto } from '../dto/RoomDto';
import { RoomService } from '../services/RoomService';

const roomService = new RoomService();

export class RoomController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const rooms = await roomService.findAll();
      const response = rooms.map((r) => new RoomDto(r));
      res.json(response);
    } catch (err) {
      next(err);
    }
  }

  static async getByNumber(req: Request, res: Response, next: NextFunction) {
    try {
      const roomNumber = Number(req.params.roomNumber);
      const room = await roomService.findOneOrFail(roomNumber);
      res.json(new RoomDto(room));
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const created = await roomService.create(req.body);
      res.status(201).json(new RoomDto(created));
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const roomNumber = Number(req.params.roomNumber);
      const updated = await roomService.update(roomNumber, req.body);
      res.json(new RoomDto(updated));
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const roomNumber = Number(req.params.roomNumber);
      await roomService.delete(roomNumber);
      res.json({ message: `Кімнату ${roomNumber} успішно видалено` });
    } catch (err) {
      next(err);
    }
  }
}
