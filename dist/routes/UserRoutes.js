"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const UserController_1 = __importDefault(require("../controllers/UserController"));
const TokenController_1 = __importDefault(require("../controllers/TokenController"));
const TokenMiddlewares_1 = __importDefault(require("../middlewares/TokenMiddlewares"));
router.get('/', TokenMiddlewares_1.default.isAuthenticated, UserController_1.default.getUsers);
router.post('/', UserController_1.default.createUser);
router.post('/login', UserController_1.default.logUser);
router.post('/refresh-token', TokenController_1.default.refreshAccessToken);
router.post('/is-refresh-token-valid', TokenController_1.default.isRefreshTokenValid);
router.post('/logout', TokenMiddlewares_1.default.isAuthenticated, UserController_1.default.logout);
module.exports = router;
