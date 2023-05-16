import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';

// type ControllerFunction = (request: Request, response: Response, next: NextFunction) => void;

/**
 * @typedef Controller
 * @param {Request} req user request
 * @param {Response} res user response
 * @param {NextFunction} next next function
 * @returns {void} void
 */

/**
 * This class has all the methods to control user table
 *
 * @class
 */
class UsersController {
  public userService = new userService();

  /**
   * Controller function for getting user list
   *
   * @param _req user request
   * @param res user response
   * @param next next function
   * @returns nothing
   */

  public getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller function for getting user by id
   *
   * @param req user request
   * @param res user response
   * @param next next function
   * @returns nothing
   */

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: User = await this.userService.findUserById(userId);

      // res.status(200).json({ data: findOneUserData, message: 'findOne' });
      res.render('index.ejs', { user: findOneUserData });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller function for creating new user
   *
   * @param req user request
   * @param res user response
   * @param next next function
   * @returns nothing
   */
  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller function for updating user
   *
   * @param req user request
   * @param res user response
   * @param next next function
   * @returns nothing
   */
  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller function for deleting user
   *
   * @param req user request
   * @param res user response
   * @param next next function
   * @returns nothing
   */
  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
