"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserHelpers {
    static verifyUserEmail(email) {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    }
    static checkingUser(user) {
        if (!user.name || !user.email || !user.password) {
            return false;
        }
        return true;
    }
    static checkingUserLogin(user) {
        if (!user.email || !user.password) {
            return false;
        }
        return true;
    }
    static checkPasswordStrength(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }
    static hashPassword(password) {
        let salt = bcryptjs_1.default.genSaltSync(10);
        let hash = bcryptjs_1.default.hashSync(password, salt);
        return hash;
    }
    static comparePassword(password, hash) {
        return bcryptjs_1.default.compareSync(password, hash);
    }
}
exports.default = UserHelpers;
