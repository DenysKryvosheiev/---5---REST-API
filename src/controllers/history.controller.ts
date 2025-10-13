import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Room } from '../orm/entities/Room';
import { Student } from '../orm/entities/Student';
import { StudentRoomHistory } from '../orm/entities/StudentRoomHistory';

const repo = () => getRepository(StudentRoomHistory);
const studentRepo = () => getRepository(Student);
const roomRepo = () => getRepository(Room);

export async function createHistory(req: Request, res: Response) {
  try {
    const { moveInDate, moveOutDate, studentId, roomNumber } = req.body;

    const student = await studentRepo().findOne(studentId);
    const room = await roomRepo().findOne(roomNumber);

    if (!student) return res.status(400).json({ error: 'Student not found' });
    if (!room) return res.status(400).json({ error: 'Room not found' });

    const h = repo().create({
      moveInDate,
      moveOutDate,
      student,
      room,
    });

    const saved = await repo().save(h);
    return res.status(201).json(saved);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Cannot create history', details: e.message });
  }
}

export async function getHistories(req: Request, res: Response) {
  const list = await repo().find({ relations: ['student', 'room'] });
  return res.json(list);
}

export async function getHistoryById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Некоректний ID' });
    }

    const history = await repo().findOne({
      where: { id },
      relations: ['student', 'room'],
    });

    if (!history) {
      return res.status(404).json({ message: 'Історію проживання не знайдено' });
    }

    return res.json([history]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Помилка сервера' });
  }
}
export async function updateHistory(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Некоректний ID' });
    }

    const repoInstance = repo();
    const history = await repoInstance.findOne({ where: { id } });

    if (!history) {
      return res.status(404).json({ message: 'Історію проживання не знайдено' });
    }
    Object.assign(history, req.body);

    await repoInstance.save(history);

    return res.json({ message: 'Історію проживання оновлено', history });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Помилка сервера' });
  }
}
export async function deleteHistory(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Некоректний ID' });
    }

    const repoInstance = repo();
    const history = await repoInstance.findOne({ where: { id } });

    if (!history) {
      return res.status(404).json({ message: 'Історію проживання не знайдено' });
    }

    await repoInstance.remove(history);

    return res.json({ message: 'Історію проживання успішно видалено' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Помилка сервера' });
  }
}
