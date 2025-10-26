import { Request, Response, NextFunction } from 'express';

import { StudentRoomHistoryDto } from '../dto/StudentRoomHistoryDto';
import { HistoryService } from '../services/HistoryService';

const historyService = new HistoryService();

export class StudentRoomHistoryController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const histories = await historyService.findAll();
      const response = histories.map((h) => new StudentRoomHistoryDto(h));
      res.json(response);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const history = await historyService.findOne(id);
      res.json(new StudentRoomHistoryDto(history));
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const created = await historyService.create(req.body);
      res.status(201).json(new StudentRoomHistoryDto(created));
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const updated = await historyService.update(id, req.body);
      res.json(new StudentRoomHistoryDto(updated));
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      await historyService.delete(id);
      res.json({ message: 'Історію проживання успішно видалено' });
    } catch (err) {
      next(err);
    }
  }
}
