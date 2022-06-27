"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../services/UserService"));
const UserHelpers_1 = __importDefault(require("../helpers/UserHelpers"));
const TokenService_1 = __importDefault(require("../services/TokenService"));
class UserController {
    static getUsers(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield UserService_1.default.getUsers();
            return res.json(users);
        });
    }
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            if (!UserHelpers_1.default.checkingUser({ name, email, password })) {
                return res.status(400).json({
                    message: 'Missing required fields'
                });
            }
            if (!UserHelpers_1.default.verifyUserEmail(email)) {
                return res.status(400).json({
                    error: 'Invalid email'
                });
            }
            if (!UserHelpers_1.default.checkPasswordStrength(password)) {
                return res.status(400).json({
                    error: 'Password must be at least 8 characters long, contain at least one number, one uppercase letter and one special character'
                });
            }
            if (yield UserService_1.default.checkUser(email)) {
                return res.status(409).json({
                    message: 'User with this email already exists',
                });
            }
            const newUser = yield UserService_1.default.createUser({ name, email, password: UserHelpers_1.default.hashPassword(password) });
            return res.json({
                message: 'User created successfully',
                user: newUser,
            });
        });
    }
    static logUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!UserHelpers_1.default.checkingUserLogin({ email, password })) {
                return res.status(400).json({
                    message: 'Missing required fields'
                });
            }
            if (!UserHelpers_1.default.verifyUserEmail(email)) {
                return res.status(400).json({
                    error: 'Invalid email'
                });
            }
            const user = yield UserService_1.default.logUser(email);
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            if (!UserHelpers_1.default.comparePassword(password, user.password)) {
                return res.status(401).json({
                    message: 'Invalid password'
                });
            }
            const tokens = yield TokenService_1.default.genereteRefreshToken(user.id);
            return res.json({
                message: 'User logged in successfully',
                tokens
            });
        });
    }
}
exports.default = UserController;
