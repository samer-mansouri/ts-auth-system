"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TokenService_1 = __importDefault(require("../services/TokenService"));
class TokenController {
    static refreshAccessToken(req, res) {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            return res.status(400).send('Invalid refresh token');
        }
        else {
            const accessToken = TokenService_1.default.refreshAccessToken(refreshToken);
            return res.send(accessToken);
        }
    }
    static isRefreshTokenValid(req, res) {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            return res.status(400).send('Invalid refresh token 1');
        }
        else {
            const isValid = TokenService_1.default.isRefreshTokenValid(refreshToken);
            if (isValid) {
                return res.send('Refresh token is valid');
            }
            else {
                return res.status(400).send('Invalid refresh token');
            }
        }
    }
}
exports.default = TokenController;
