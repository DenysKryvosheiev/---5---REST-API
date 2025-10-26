import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from '../../../utils/response/custom-error/CustomError';

export const validatorCreateRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roomNumber, places, area } = req.body;

    const errorsValidation: { [key: string]: string }[] = [];

    if (roomNumber === undefined || roomNumber === null || validator.isEmpty(roomNumber.toString().trim())) {
      errorsValidation.push({ roomNumber: "Поле 'Номер кімнати' є обов’язковим" });
    } else if (!validator.isInt(roomNumber.toString(), { min: 1 })) {
      errorsValidation.push({ roomNumber: 'Номер кімнати повинен бути додатним цілим числом' });
    }

    if (places === undefined || places === null || validator.isEmpty(places.toString().trim())) {
      errorsValidation.push({ places: "Поле 'Кількість місць' є обов’язковим" });
    } else if (!validator.isInt(places.toString(), { min: 1, max: 10 })) {
      errorsValidation.push({ places: 'Кількість місць повинна бути в межах від 1 до 10' });
    }

    if (area === undefined || area === null || validator.isEmpty(area.toString().trim())) {
      errorsValidation.push({ area: "Поле 'Площа кімнати' є обов’язковим" });
    } else if (!validator.isFloat(area.toString(), { min: 5, max: 100 })) {
      errorsValidation.push({ area: 'Площа кімнати повинна бути числом від 5 до 100 м²' });
    }

    if (errorsValidation.length > 0) {
      throw new CustomError(400, 'Validation', 'Помилка валідації кімнати', null, null, errorsValidation);
    }

    next();
  } catch (err) {
    next(err);
  }
};
