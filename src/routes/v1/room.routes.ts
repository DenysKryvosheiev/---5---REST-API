import { Router } from 'express';

import { createRoom, getRooms, getRoomByNumber,updateRoom,deleteRoom} from '../../controllers/room.controller';

const router = Router();
router.post('/', createRoom);
router.get('/:roomNumber', getRoomByNumber);
router.get('/', getRooms);
router.patch('/:roomNumber', updateRoom);
router.delete('/:roomNumber', deleteRoom);
export default router;
