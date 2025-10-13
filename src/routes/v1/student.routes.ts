import { Router } from 'express';

import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from '../../controllers/student.controller';
const router = Router();
router.post('/', createStudent);
router.get('/', getStudents);
router.get('/:id', getStudentById);
router.patch('/:id', updateStudent);
router.delete('/:id', deleteStudent);
export default router;
