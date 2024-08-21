import { Router } from 'express';

import {
	createMedication,
	deleteMedication,
	getMedication,
	getUserMedications,
	updateMedication,
	updateMedicationCount,
} from '../controller/medication.controller.js';

import { authenticateUser } from '../middleware/auth.js';

const router = Router();

router.get('/medications', authenticateUser, getUserMedications);
router.post('/medications', authenticateUser, createMedication);
router.get('/medications/:id', authenticateUser, getMedication);
router.put('/medications/:id', authenticateUser, updateMedication);
router.put('/medications/:id/count', authenticateUser, updateMedicationCount);
router.delete('/medications/:id', authenticateUser, deleteMedication);

export default router;
