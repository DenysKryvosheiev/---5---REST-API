import { Router } from 'express';

import { StudentRoomHistoryController } from '../../controllers/history.controller';
import { checkJwt } from '../../middleware/checkJwt';

const router = Router();

router.get('/', checkJwt, StudentRoomHistoryController.getAll);
router.get('/:id', checkJwt, StudentRoomHistoryController.getById);
router.post('/', checkJwt, StudentRoomHistoryController.create);
router.patch('/:id', checkJwt, StudentRoomHistoryController.update);
router.delete('/:id', checkJwt, StudentRoomHistoryController.delete);

export default router;
