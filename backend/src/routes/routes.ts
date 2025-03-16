import { Router } from 'express';
import * as gameController from '../controllers/gameController';

const router = Router();

router.post('/start-game', gameController.startGame);
router.post('/chat-with-npc', gameController.askQuestion);
router.post('/finish-game', gameController.finishGame);

export default router;