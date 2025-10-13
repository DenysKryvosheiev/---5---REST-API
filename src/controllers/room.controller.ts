import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Room } from '../orm/entities/Room';

const repo = () => getRepository(Room);

export async function createRoom(req: Request, res: Response) {
  try {
    const r = repo().create(req.body);
    const saved = await repo().save(r);
    return res.status(201).json(saved);
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: 'Cannot create room', details: e.message });
  }
}

export async function getRooms(req: Request, res: Response) {
  const list = await repo().find();
  return res.json(list);
}

export async function getRoomByNumber(req: Request, res: Response) {
  try {
    const { roomNumber } = req.params;
    const room = await repo().findOne({
      where: { roomNumber: parseInt(roomNumber, 10) },
    });

    if (!room) {
      return res.status(404).json({ message: `Room ${roomNumber} not found` });
    }

    return res.status(200).json(room);
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: 'Cannot fetch room', details: e.message });
  }
}
export async function updateRoom(req: Request, res: Response) {
  try {
    const { roomNumber } = req.params;
    const num = parseInt(roomNumber, 10);

    if (isNaN(num)) {
      return res.status(400).json({ message: 'Invalid room number' });
    }

    const room = await repo().findOne({ where: { roomNumber: num } });

    if (!room) {
      return res.status(404).json({ message: `Room ${roomNumber} not found` });
    }

    Object.assign(room, req.body); // оновлюємо лише передані поля
    const updated = await repo().save(room);

    return res.status(200).json({
      message: `Room ${roomNumber} updated successfully`,
      room: updated,
    });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: 'Cannot update room', details: e.message });
  }
}
export async function deleteRoom(req: Request, res: Response) {
  try {
    const { roomNumber } = req.params;
    const num = parseInt(roomNumber, 10);

    if (isNaN(num)) {
      return res.status(400).json({ message: 'Invalid room number' });
    }

    const room = await repo().findOne({ where: { roomNumber: num } });

    if (!room) {
      return res.status(404).json({ message: `Room ${roomNumber} not found` });
    }

    await repo().remove(room);

    return res.status(200).json({ message: `Кімнату ${roomNumber} успішно видалено` });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: 'Cannot delete room', details: e.message });
  }
}