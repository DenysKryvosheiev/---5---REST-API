# Лабораторно-практична робота №5
## Розширення бекенд-додатку власними сутностями та реалізація REST API

## Діаграмма сутностей:
![Діаграмма](/img/діаграмма.png)
## Короткий опис реалізованих сутностей
### Students - ця сутність описує всіх студентів
### Rooms -  ця сутність описує всі кімнати
### Histories - це зв'язуюча сутність утворенна зв'язком ManyToMany, що описує проживання студента у кімнаті у певний проміжок часу.
### Опис зв'яку: Students зв'язок OneToMany до Histories та від Histories зв'язок ManyToOne до Rooms.
### Students

POST /v1/students — створення запису

GET /v1/students — отримання всіх записів

GET /v1/students/:id — отримання запису за певним ID

PATCH /v1/students/:id — модифікування запису

DELETE /v1/students/:id — видалення запису
### Rooms
POST /v1/rooms — створення запису

GET /v1/rooms — отримання всіх записів

GET /v1/rooms/:id — отримання запису за певним ID (номером кімнати)

PATCH /v1/rooms/:id — модифікування запису

DELETE /v1/rooms/:id — видалення запису

### Histories

POST /v1/histories — створення запису

GET /v1/histories — отримання всіх записів

GET /v1/histories/:id — отримання запису за певним ID

PATCH /v1/histories/:id — модифікування запису

DELETE /v1/histories/:id — видалення запису

## Скріншоти з Postman
POST /v1/students — створення запису
![students](/img/post_students.jpg)
GET /v1/students — отримання всіх записів
![students](/img/get_students.jpg)
GET /v1/students/:id — отримання запису за певним ID
![students](/img/get_id_students.jpg)
PATCH /v1/students/:id — модифікування запису
![students](/img/patch_students.jpg)
DELETE /v1/students/:id — видалення запису
![students](/img/delete_histories.jpg)

POST /v1/rooms — створення запису
![rooms](/img/post_rooms.jpg)
GET /v1/rooms — отримання всіх записів
![students](/img/get_rooms.jpg)
GET /v1/rooms/:id — отримання запису за певним ID (номером кімнати)
![students](/img/get_id_rooms.jpg)
PATCH /v1/rooms/:id — модифікування запису
![students](/img/patch_rooms.jpg)
DELETE /v1/rooms/:id — видалення запису
![students](/img/delete_rooms.jpg)

POST /v1/histories — створення запису
![histories](/img/post_histories.jpg)
GET /v1/histories — отримання всіх записів
![students](/img/get_histories.jpg)
GET /v1/hietories/:id — отримання запису за певним ID
![students](/img/get_id_histories.jpg)
PATCH /v1/histories/:id — модифікування запису
![students](/img/patch_histories.jpg)
DELETE /v1/histories/:id — видалення запису
![students](/img/delete_students.jpg)

# Лабораторно-практична робота №6
# Впровадження сервісного шару, валідації та DTO
## Шари додатку
### **Middleware — Валідація вхідних даних**
Middleware-функції перевіряють коректність даних до передачі їх у бізнес-логіку.  
У разі помилки — створюється об’єкт `CustomError` із статусом **400 Bad Request**.
### **Controller — Оркестрація запиту**
Контролери відповідають за:
прийом запиту від клієнта,
виклик відповідного сервісу,
формування та повернення відповіді або помилки.
Контролер не містить бізнес-логіки — лише координує запит.
### **Service — Бізнес-логіка**
Сервіси реалізують бізнес-правила додатку.
Вони працюють з даними, виконують перевірки, звертаються до репозиторіїв і повертають результат у вигляді DTO.
### **Repository — Доступ до даних**
Репозиторії реалізовані через TypeORM.
Вони забезпечують роботу з базою даних: пошук, створення, оновлення та видалення сутностей.
## Приклад Коду
### Middleware
```
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
```
### DTO
```
import { Student } from '../orm/entities/Student';

export class StudentDto {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  registrationDate: string;
  studentCardNumber: string;
  phoneNumber: string;
  benefits?: string | null;

  constructor(student: Student) {
    this.id = student.id;
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.middleName = student.middleName;
    this.birthDate =
      student.birthDate instanceof Date ? student.birthDate.toISOString().split('T')[0] : student.birthDate;
    this.registrationDate =
      student.registrationDate instanceof Date
        ? student.registrationDate.toISOString().split('T')[0]
        : student.registrationDate;

    this.studentCardNumber = student.studentCardNumber;
    this.phoneNumber = student.phoneNumber;
    this.benefits = student.benefits ?? null;
  }
}
```
### Service
```
import { getRepository } from 'typeorm';

import { StudentDto } from '../dto/StudentDto';
import { Student } from '../orm/entities/Student';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class StudentService {
  private studentRepository = getRepository(Student);

  async getAllStudents() {
    const students = await this.studentRepository.find();
    return students.map((s) => new StudentDto(s));
  }

  async getStudentById(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'Некоректний ID студента');
    }

    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new CustomError(404, 'General', 'Студента не знайдено');
    }

    return new StudentDto(student);
  }

  async createStudent(data: Partial<Student>) {
    const student = this.studentRepository.create(data);
    const created = await this.studentRepository.save(student);
    return new StudentDto(created);
  }

  async updateStudent(id: number, data: Partial<Student>) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'Некоректний ID студента');
    }

    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new CustomError(404, 'General', 'Студента не знайдено');
    }

    Object.assign(student, data);
    const updated = await this.studentRepository.save(student);
    return new StudentDto(updated);
  }

  async deleteStudent(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'Некоректний ID студента');
    }

    const result = await this.studentRepository.delete(id);
    if (!result.affected) {
      throw new CustomError(404, 'General', 'Студента не знайдено');
    }

    return { message: `Студент з ID ${id} успішно видалений` };
  }
}
```
## Скріншоти Postman
### Поганий запит
![request](/img/bad_request.jpg)
### Успішний запит
![request](/img/good_request.jpg)
