import express from 'express';
import {signup} from '../contoller/userController.js'
import {login} from '../contoller/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router
