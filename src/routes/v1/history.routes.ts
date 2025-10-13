import { Router } from 'express';

import { createHistory, getHistories, getHistoryById,updateHistory, deleteHistory} from '../../controllers/history.controller';
const router = Router();
router.post('/', createHistory);
router.get('/', getHistories);
router.get('/:id', getHistoryById);
router.patch('/:id', updateHistory);
router.delete('/:id', deleteHistory);
export default router;
