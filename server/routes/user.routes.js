import { Router } from 'express';
import {
	createUser,
	getUser,
	loginUser,
	refreshToken,
} from '../controller/user.controller.js';

import { authenticateUser } from '../middleware/auth.js';

const router = Router();

router.post('/signup', createUser);
router.post('/login', loginUser);

// get user route

router.get('/user', authenticateUser, getUser);

// refresh token route

router.post('/refresh-token', refreshToken);

export default router;
