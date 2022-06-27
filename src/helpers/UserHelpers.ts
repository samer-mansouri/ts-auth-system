
import UserI from "../interfaces/UserInterface";
import  bcrypt from "bcryptjs";


class UserHelpers {

    public static verifyUserEmail(email: string): boolean {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    }

    public static checkingUser(user: UserI): boolean {
        if (!user.name || !user.email || !user.password) {
            return false;
        }
        return true;
    }

    public static checkingUserLogin(user: UserI): boolean {
        if (!user.email || !user.password) {
            return false;
        }
        return true;
    }

    public static checkPasswordStrength(password: string): boolean {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    public static hashPassword(password: string): string {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash;
    }

    public static comparePassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }

}

export default UserHelpers;