import { hash } from 'bcrypt';
import DB from '@databases';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';

/**
 * This is server class for user controller
 *
 *@class
 */
class UserService {
  public users = DB.users;

  /**
   * This function return user list
   *
   * @function
   * @returns  Return users list
   */
  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.users.findAll();
    return allUser;
  }

  /**
   * This function returns a user by provided userID
   *
   * @function
   * @param userId userID of a user
   * @returns A user
   * @throws {HttpException}
   */
  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  /**
   * This function creates a new user if user email is not exists.
   *
   * @function
   * @param userData Data of the user to create.
   * @returns new created user
   */
  public async createUser(userData: CreateUserDto): Promise<unknown> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    return DB;
    // if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    // console.log('DB', DB);
    // const findUser: User = await this.users.findOne({ where: { email: userData.email } });
    // if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    // const hashedPassword = await hash(userData.password, 10);
    // const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });
    // return createUserData;
  }

  /**
   * This function update user by provided id.
   *
   * @function
   * @param userId ID of the user.
   * @param userData User data.
   * @returns Updated user
   */
  public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    await this.users.update({ ...userData, password: hashedPassword }, { where: { id: userId } });

    const updateUser: User = await this.users.findByPk(userId);
    return updateUser;
  }

  /**
   * This function delete a user by ID
   *
   * @function
   * @param userId User ID
   * @returns deleted user
   */
  public async deleteUser(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "User doesn't existId");

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await this.users.destroy({ where: { id: userId } });

    return findUser;
  }
}

export default UserService;
