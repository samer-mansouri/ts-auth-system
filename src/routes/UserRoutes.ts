import express from 'express';

const router = express.Router();

import UserController from '../controllers/UserController';
import TokenController from '../controllers/TokenController';


router.get('/', UserController.getUsers);
router.post('/', UserController.createUser);
router.post('/login', UserController.logUser);
router.post('/refresh-token', TokenController.refreshAccessToken);
router.post('/is-refresh-token-valid', TokenController.isRefreshTokenValid);

module.exports = router;