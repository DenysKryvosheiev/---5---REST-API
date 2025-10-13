import { Router } from 'express';

import auth from './auth';
import historyRouter from './history.routes';
import roomRouter from './room.routes';
import studentRouter from './student.routes';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/students', studentRouter);
router.use('/rooms', roomRouter);
router.use('/histories', historyRouter);

export default router;
