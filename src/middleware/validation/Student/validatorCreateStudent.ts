import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from '../../../utils/response/custom-error/CustomError';

export const validatorCreateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, middleName, phoneNumber, studentCardNumber, birthDate, registrationDate, benefits } =
      req.body;

    const errorsValidation: { [key: string]: string }[] = [];
    if (!firstName || validator.isEmpty(firstName.trim())) {
      errorsValidation.push({ firstName: "Поле 'Ім’я' є обов’язковим" });
    }
    if (!lastName || validator.isEmpty(lastName.trim())) {
      errorsValidation.push({ lastName: "Поле 'Прізвище' є обов’язковим" });
    }

    if (!middleName || validator.isEmpty(middleName.trim())) {
      errorsValidation.push({ middleName: "Поле 'По-батькові' є обов’язковим" });
    }

    if (!phoneNumber || validator.isEmpty(phoneNumber.trim())) {
      errorsValidation.push({ phoneNumber: "Поле 'Номер телефону' є обов’язковим" });
    } else if (!validator.isMobilePhone(phoneNumber, 'uk-UA')) {
      errorsValidation.push({
        phoneNumber: 'Некоректний номер телефону (очікується формат українського номера)',
      });
    }

    if (!studentCardNumber || validator.isEmpty(studentCardNumber.trim())) {
      errorsValidation.push({ studentCardNumber: "Поле 'Номер студентського квитка' є обов’язковим" });
    }

    if (!birthDate || validator.isEmpty(birthDate.trim())) {
      errorsValidation.push({ birthDate: "Поле 'Дата народження' є обов’язковим" });
    } else if (!validator.isDate(birthDate, { format: 'YYYY-MM-DD', strictMode: true })) {
      errorsValidation.push({ birthDate: 'Невірний формат дати народження (очікується YYYY-MM-DD)' });
    }

    if (!registrationDate || validator.isEmpty(registrationDate.trim())) {
      errorsValidation.push({ registrationDate: "Поле 'Дата реєстрації' є обов’язковим" });
    } else if (!validator.isDate(registrationDate, { format: 'YYYY-MM-DD', strictMode: true })) {
      errorsValidation.push({ registrationDate: 'Невірний формат дати реєстрації (очікується YYYY-MM-DD)' });
    }

    if (benefits && !validator.isLength(benefits, { max: 100 })) {
      errorsValidation.push({ benefits: 'Поле "Пільги" не повинно перевищувати 100 символів' });
    }

    if (errorsValidation.length > 0) {
      throw new CustomError(400, 'Validation', 'Помилка валідації студента', null, null, errorsValidation);
    }

    next();
  } catch (err) {
    next(err);
  }
};
