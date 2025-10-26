import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from '../../../utils/response/custom-error/CustomError';

export const validatorCreateStudentRoomHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { moveInDate, moveOutDate, room, student } = req.body;
    const errorsValidation: Record<string, string>[] = [];

    if (!moveInDate || validator.isEmpty(moveInDate.toString().trim())) {
      errorsValidation.push({ moveInDate: "Поле 'Дата заселення' є обов’язковим" });
    } else if (!validator.isDate(moveInDate, { format: 'YYYY-MM-DD', strictMode: true })) {
      errorsValidation.push({ moveInDate: 'Невірний формат дати заселення (очікується YYYY-MM-DD)' });
    }

    if (moveOutDate && !validator.isEmpty(moveOutDate.toString().trim())) {
      if (!validator.isDate(moveOutDate, { format: 'YYYY-MM-DD', strictMode: true })) {
        errorsValidation.push({ moveOutDate: 'Невірний формат дати виселення (очікується YYYY-MM-DD)' });
      } else if (new Date(moveOutDate) < new Date(moveInDate)) {
        errorsValidation.push({ moveOutDate: 'Дата виселення не може бути раніше дати заселення' });
      }
    }
    const studentId = typeof student === 'object' ? student.id : student;
    if (!studentId || !validator.isInt(studentId.toString(), { min: 1 })) {
      errorsValidation.push({ student: 'Некоректний ідентифікатор студента' });
    }

    const roomNumber = typeof room === 'object' ? room.roomNumber : room;
    if (!roomNumber || !validator.isInt(roomNumber.toString(), { min: 1 })) {
      errorsValidation.push({ room: 'Некоректний номер кімнати' });
    }

    if (errorsValidation.length > 0) {
      throw new CustomError(
        400,
        'Validation',
        'Помилка валідації історії заселення студента',
        null,
        null,
        errorsValidation,
      );
    }
    req.body.student = Number(studentId);
    req.body.room = Number(roomNumber);

    next();
  } catch (err) {
    next(err);
  }
};
