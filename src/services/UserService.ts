import { PrismaClient, Prisma  } from '@prisma/client';
import UserI from '../interfaces/UserInterface';

const prisma: PrismaClient = new PrismaClient();


class UserService {

    public static async getUsers(): Promise<UserI[]> {
        const users = await prisma.user.findMany();
        return users;
    }

    public static async checkUser(email: string) : Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                id: true
            }
        });
        return user ? true : false;
    }



    public static async createUser(user: UserI) : Promise<UserI> {
        const newUser = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        });
        return newUser;
    }

    public static logUser(email: string): Prisma.Prisma__UserClient< { id: string, password: string } | null>{
        const user = prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                password: true
            }
        });
        return user;
    }

}

export default UserService;