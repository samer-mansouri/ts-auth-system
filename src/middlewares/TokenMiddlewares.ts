import TokenService from "../services/TokenService";
import { Request, Response } from "express";

class TokenMiddlewares {

    public static isAuthenticated(req: Request, res: Response, next: Function): Response {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            return res.status(401).send({
                message: "Unauthorized"
            });
        } else {
            const isValid = TokenService.isAccessTokenValid(accessToken);
            if (isValid) {
                return next();
            } else {
                return res.status(401).send({
                    message: 'Unauthorized'
                });
            }
        }
    }

}

export default TokenMiddlewares;