import { Router } from 'express';

import { StudentController } from '../../controllers/student.controller';
import { checkJwt } from '../../middleware/checkJwt';
import { validatorCreateStudent } from '../../middleware/validation/student/validatorCreateStudent';

const router = Router();

router.get('/', checkJwt, StudentController.getAll);

router.get('/:id', checkJwt, StudentController.getById);

router.post('/', checkJwt, validatorCreateStudent, StudentController.create);

router.put('/:id', checkJwt, validatorCreateStudent, StudentController.update);

router.delete('/:id', checkJwt, StudentController.delete);

export default router;
