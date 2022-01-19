import express from 'express';
var router = express.Router();

import { signin, signup} from '../controllers/users.js';

router.post('/signup', signup);
router.post('/signin', signin);

export default router;