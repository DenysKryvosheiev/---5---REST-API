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
