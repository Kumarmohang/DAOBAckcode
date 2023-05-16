import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
//import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
//import authMiddleware from '@middlewares/auth.middleware';
// import validationMiddleware from '@middlewares/validation.middleware';
// import { authLocalMiddleware } from '../middlewares/passportAuth.middleware';

/**
 * This class contains all the routes for user authorization
 *
 * @class
 */
class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  /**
   * This constructor initilize Routes
   *
   * @class
   * @returns nothing
   */
  constructor() {
    this.initializeRoutes();
  }

  /**
   * This method defines all authorization routes
   *
   * @function
   * @returns nothing
   */
  private initializeRoutes() {
    this.router.post(`${this.path}login`, this.authController.logIn);
    this.router.post(`${this.path}nonce`, this.authController.Nonce);
  }
}

export default AuthRoute;
