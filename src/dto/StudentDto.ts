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
