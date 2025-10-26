import { Router } from 'express';

import { RoomController } from '../../controllers/room.controller';
import { checkJwt } from '../../middleware/checkJwt';
import { validatorCreateRoom } from '../../middleware/validation/room/validatorCreateRoom';

const router = Router();

router.get('/', checkJwt, RoomController.getAll);
router.get('/:roomNumber', checkJwt, RoomController.getByNumber);
router.post('/', checkJwt, validatorCreateRoom, RoomController.create);
router.patch('/:roomNumber', checkJwt, RoomController.update);
router.delete('/:roomNumber', checkJwt, RoomController.delete);

export default router;
