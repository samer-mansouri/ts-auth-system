import express from 'express';

const router = express.Router();

import UserController from '../controllers/UserController';
import TokenController from '../controllers/TokenController';
import TokenMiddlewares from '../middlewares/TokenMiddlewares';


router.get('/', TokenMiddlewares.isAuthenticated, UserController.getUsers);
router.post('/', UserController.createUser);
router.post('/login', UserController.logUser);
router.post('/refresh-token', TokenController.refreshAccessToken);
router.post('/is-refresh-token-valid', TokenController.isRefreshTokenValid);
router.post('/logout', TokenMiddlewares.isAuthenticated, UserController.logout);

module.exports = router;