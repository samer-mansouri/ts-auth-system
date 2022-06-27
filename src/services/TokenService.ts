import jwt from 'jsonwebtoken';
import { PrismaClient  } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();




class TokenService {

    static ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || "access-token-secret";
    static REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret";


    //Enregsitrer la refresh token au niveau de la BD
    public static async storeToken(token: string, id: string): Promise<void> {
        await prisma.refreshTokens.create({
            data: {
                token: token,
                user: {
                    connect: {
                        id: id
                    }
                }
            }
        });
    }


    //Générer un refresh token, et l'enregistrer dans la BD, puis générer un token d'authentification
    // et l'envoyer à l'utilisateur
    public static async genereteRefreshToken(id: string): Promise<{
                                                                        refreshToken: string,
                                                                        accessToken: string
                                                                    }> 
    {
        console.log(this.REFRESH_TOKEN_SECRET);
        const refreshToken = jwt.sign({ id }, this.REFRESH_TOKEN_SECRET, { expiresIn: '2d' });
        await this.storeToken(refreshToken, id);
        const accessToken = await this.generateAccessToken(id);
        return { refreshToken, accessToken };
    }

    //Générer un token d'authentification
    public static async generateAccessToken(id: string): Promise<string> {
        const token = jwt.sign({ id }, this.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        return token;
    }



    //Vérifier si le refresh token est valide
    public static isRefreshTokenValid(refreshToken: string): boolean {
            try{
                jwt.verify(refreshToken, this.REFRESH_TOKEN_SECRET);
                return true;
            } catch (err) {
                return false;
            }
    }

    //Supprimer le refresh token de la BD
    public static async deleteRefreshToken(refreshToken: string): Promise<void> {
        await prisma.refreshTokens.delete({
            where: {
                token: refreshToken
            }
        });
    }

    //Rafraichir le token d'authentification
    public static async refreshAccessToken(refreshToken: string): Promise<string> {
        if (!this.isRefreshTokenValid(refreshToken)) {
            throw new Error('Invalid refresh token');
        } else {
            const { id } = jwt.verify(refreshToken, this.ACCESS_TOKEN_SECRET) as { id: string };
            return await this.generateAccessToken(id);
        }
    }

    //Vérifier si le token d'authentification est valide
    public static isAccessTokenValid(accessToken: string): boolean {
        try {
            jwt.verify(accessToken, this.ACCESS_TOKEN_SECRET);
            return true;
        }
        catch (err) {
            return false;
        }
    }


}

export default TokenService;