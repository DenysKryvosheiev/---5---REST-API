import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Student } from '../orm/entities/Student';

const repo = () => getRepository(Student);

export async function createStudent(req: Request, res: Response) {
  try {
    const s = repo().create(req.body);
    const saved = await repo().save(s);
    return res.status(201).json(saved);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Cannot create student', details: e.message });
  }
}

export async function getStudents(req: Request, res: Response) {
  const list = await repo().find();
  return res.json(list);
}

export async function getStudentById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const item = await repo().findOne(id);
  if (!item) return res.status(404).json({ error: 'Student not found' });
  return res.json(item);
}

export async function updateStudent(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Некоректний ID студента' });
    }
    const repoInstance = repo();
    const existing = await repoInstance.findOne({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: `Студента з ID ${id} не знайдено` });
    }
    await repoInstance.update(id, req.body);
    const updated = await repoInstance.findOne({ where: { id } });
    return res.json(updated);
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: 'Помилка при оновленні студента', details: e.message });
  }
}
export async function deleteStudent(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Некоректний ID студента' });
    }
    const repoInstance = repo();
    const student = await repoInstance.findOne({ where: { id } });
    if (!student) {
      return res.status(404).json({ message: `Студента з ID ${id} не знайдено` });
    }
    await repoInstance.delete(id);
    return res.status(200).json({ message: `Студент ${id} був успішно видалений` });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: 'Помилка при видаленні студента', details: e.message });
  }
}
