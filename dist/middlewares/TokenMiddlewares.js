"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TokenService_1 = __importDefault(require("../services/TokenService"));
class TokenMiddlewares {
    static isAuthenticated(req, res, next) {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            return res.status(401).send('Unauthorized');
        }
        else {
            const isValid = TokenService_1.default.isAccessTokenValid(accessToken);
            if (isValid) {
                return next();
            }
            else {
                return res.status(401).send('Unauthorized');
            }
        }
    }
}
exports.default = TokenMiddlewares;
