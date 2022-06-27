import { Request, Response } from "express";
import TokenService from "../services/TokenService";



class TokenController{

    public static refreshAccessToken(req: Request, res: Response): Response {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            return res.status(400).send('Invalid refresh token');
        } else {
            const accessToken = TokenService.refreshAccessToken(refreshToken);
            return res.send(accessToken);
        }
    }

    public static isRefreshTokenValid(req: Request, res: Response): Response {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            return res.status(400).send('Invalid refresh token 1');
        } else {
            const isValid = TokenService.isRefreshTokenValid(refreshToken);
            if (isValid) {
                return res.send('Refresh token is valid');
            } else {
                return res.status(400).send('Invalid refresh token');
            }
        }
    }

}

export default TokenController;