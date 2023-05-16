/* eslint-disable valid-jsdoc */
import { NextFunction, Request, Response } from 'express';
import { User } from '@interfaces/users.interface';
import { RequestWithUser } from '@interfaces/auth.interface';
import AuthService from '@services/auth.service';

/**
 * This Class contains all functionality of user authentication
 *
 * @class
 */
class AuthController {
  public authService = new AuthService();

  /**
   * Controller function for registering user in table
   *
   * @param req user request
   * @param res user response
   * @param next next function
   * @returns nothing
   */

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: any = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller function for login user after successful authentication
   *
   * @param req user request
   * @param res user response
   * @param next next function
   * @returns nothing
   */

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const token = await this.authService.login(userData);
      res.status(201).json({ data: token, message: 'login success full' });
    } catch (error) {
      next(error);
    }
  };
  public Nonce = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: any = req.body;
      const nonce = await this.authService.Nonce(userData);
      res.status(201).json({ nonce: nonce, message: 'got the nonce' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller function for logout user
   *
   * @param req user request
   * @param res user response
   * @param next next function
   * @returns nothing
   */
  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller function for creating one time access token
   *
   * @param req user request
   * @param res user response
   * @param next next function
   * @returns nothing
   */

  public getOneTimeToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const token = await this.authService.getOneTimeToken(userData);
      res.status(201).json({ data: token });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;

// import { NextFunction, Request, Response } from 'express';
// import { CreateUserDto } from '@dtos/users.dto';
// import { User } from '@interfaces/users.interface';
// import { RequestWithUser } from '@interfaces/auth.interface';
// import AuthService from '@services/auth.service';

// /**
//  * This Class contains all functionality of user authentication
//  *
//  * @class
//  */
// class AuthController {
//   public authService = new AuthService();

//   /**
//    * Controller function for registering user in table
//    *
//    * @param req user request
//    * @param res user response
//    * @param next next function
//    * @returns nothing
//    */

//   public signUp = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userData: CreateUserDto = req.body;
//       const signUpUserData: User = await this.authService.signup(userData);

//       res.status(201).json({ data: signUpUserData, message: 'signup' });
//     } catch (error) {
//       next(error);
//     }
//   };

//   /**
//    * Controller function for login user after successful authentication
//    *
//    * @param req user request
//    * @param res user response
//    * @param next next function
//    * @returns nothing
//    */

//   public logIn = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       //const userData: CreateUserDto = req.body;
//       // const { cookie = '', findUser = {} } = await this.authService.login(userData);
//       // passport.authenticate('local', { session: false });
//       // res.setHeader('Set-Cookie', [cookie]);
//       // res.status(200).json({ data: findUser, message: 'login' });
//       const message = await this.authService.login();
//       if (message === 'success') {
//         res.status(201).json({ data: message, message: 'login success full' });
//       } else {
//         res.status(500).json({ data: 'wrong message recieved' });
//       }
//     } catch (error) {
//       next(error);
//     }
//   };

//   /**
//    * Controller function for logout user
//    *
//    * @param req user request
//    * @param res user response
//    * @param next next function
//    * @returns nothing
//    */
//   public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
//     try {
//       const userData: User = req.user;
//       const logOutUserData: User = await this.authService.logout(userData);

//       res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
//       res.status(200).json({ data: logOutUserData, message: 'logout' });
//     } catch (error) {
//       next(error);
//     }
//   };
// }

// export default AuthController;
