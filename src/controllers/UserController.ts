import { Request, Response } from 'express';
import UserService from '../services/UserService';
import UserI from '../interfaces/UserInterface';
import UserHelpers from '../helpers/UserHelpers';
import TokenService from '../services/TokenService';



class UserController {

  public static async getUsers(_req: Request, res: Response): Promise<Response> {
    const users = await UserService.getUsers();
    return res.json(users);
  }

  public static async createUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password } : UserI = req.body;

    if (!UserHelpers.checkingUser({ name, email, password })) {
      return res.status(400).json({
        message: 'Missing required fields'
      });
    }

    if (!UserHelpers.verifyUserEmail(email)) {
      return res.status(400).json({
        error: 'Invalid email'
    });
    }

    if (!UserHelpers.checkPasswordStrength(password)) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long, contain at least one number, one uppercase letter and one special character'
    });
    }

    if (await UserService.checkUser(email)) {
      return res.status(409).json({
        message: 'User with this email already exists',
      });
    }
    const newUser = await UserService.createUser({ name, email, password: UserHelpers.hashPassword(password) });
    return res.json({
      message: 'User created successfully',
      user: newUser,
    });
  }

  public static async logUser(req: Request, res: Response): Promise<Response> {
    const { email, password }: UserI = req.body;


    if (!UserHelpers.checkingUserLogin({ email, password } as UserI)) {
      return res.status(400).json({
        message: 'Missing required fields'
      });
    }

    if (!UserHelpers.verifyUserEmail(email)) {
      return res.status(400).json({
        error: 'Invalid email'
    });
    }

    const user = await UserService.logUser(email);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    if (!UserHelpers.comparePassword(password, user.password)) {
      return res.status(401).json({
        message: 'Invalid password'
      });
    }
    
    const tokens = await TokenService.genereteRefreshToken(user.id);

    return res.json({
      message: 'User logged in successfully',
      tokens
    });
  }

}


export default UserController;