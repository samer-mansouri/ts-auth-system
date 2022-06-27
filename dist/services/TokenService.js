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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class TokenService {
    //Enregsitrer la refresh token au niveau de la BD
    static storeToken(token, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.refreshTokens.create({
                data: {
                    token: token,
                    user: {
                        connect: {
                            id: id
                        }
                    }
                }
            });
        });
    }
    //Générer un refresh token, et l'enregistrer dans la BD, puis générer un token d'authentification
    // et l'envoyer à l'utilisateur
    static genereteRefreshToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.REFRESH_TOKEN_SECRET);
            const refreshToken = jsonwebtoken_1.default.sign({ id }, this.REFRESH_TOKEN_SECRET, { expiresIn: '2d' });
            yield this.storeToken(refreshToken, id);
            const accessToken = yield this.generateAccessToken(id);
            return { refreshToken, accessToken };
        });
    }
    //Générer un token d'authentification
    static generateAccessToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign({ id }, this.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            return token;
        });
    }
    //Vérifier si le refresh token est valide
    static isRefreshTokenValid(refreshToken) {
        try {
            jsonwebtoken_1.default.verify(refreshToken, this.REFRESH_TOKEN_SECRET);
            return true;
        }
        catch (err) {
            return false;
        }
    }
    //Supprimer le refresh token de la BD
    static deleteRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.refreshTokens.delete({
                where: {
                    token: refreshToken
                }
            });
        });
    }
    //Rafraichir le token d'authentification
    static refreshAccessToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isRefreshTokenValid(refreshToken)) {
                throw new Error('Invalid refresh token');
            }
            else {
                const { id } = jsonwebtoken_1.default.verify(refreshToken, this.ACCESS_TOKEN_SECRET);
                return yield this.generateAccessToken(id);
            }
        });
    }
    //Vérifier si le token d'authentification est valide
    static isAccessTokenValid(accessToken) {
        try {
            jsonwebtoken_1.default.verify(accessToken, this.ACCESS_TOKEN_SECRET);
            return true;
        }
        catch (err) {
            return false;
        }
    }
}
TokenService.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access-token-secret";
TokenService.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret";
exports.default = TokenService;
