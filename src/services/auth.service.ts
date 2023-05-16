/* eslint-disable require-jsdoc */
/* eslint-disable prettier/prettier */
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { ethers } from 'ethers';



// import { isNull } from 'lodash';
//import { any } from 'joi';

/**
 * This class is service class for user authentication
 *
 * @class
 */
class AuthService {
  public users = DB.users;

  /**
   * This method takes user data as params and chesks if it is already present in DB
   * or not if present returns error else register user in DB and returns the same
   *
   * @param userData It takes user data (email, Password ) to register into db
   * @returns  redistered user in DB
   */
  public async signup(userData: any): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    const findUser: User = await this.users.findOne({
      where: { email: userData.email },
      attributes: [
        'email',
        'firstname',
        'lastname',
        'status',
        'org_name',
        'address',
        'fee',
        'upper_cap_ammount',
        'upper_cap_unit',
        'redirect_url',
        'hook',
        'createdAt',
        'updatedAt',
      ],
    });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    let createdUserData;
    if (!!createUserData) {
      createdUserData = await this.users.findOne({
        where: { email: createUserData.email },
        attributes: [
          'email',
          'firstname',
          'lastname',
          'status',
          'org_name',
          'address',
          'fee',
          'upper_cap_ammount',
          'upper_cap_unit',
          'redirect_url',
          'hook',
          'createdAt',
          'updatedAt',
        ],
      });
    }

    return createdUserData;
  }

  public async Nonce(userData: any): Promise<void> {
    try{
      const existUser = await this.users.findOne({ where: { publicAddress: userData.publicAddress } });
    if (!existUser) {
      const newuser = await this.users.create({ publicAddress: userData.publicAddress });
      console.log('new user', newuser);
      return newuser.nonce;
    } else{
     return existUser.nonce;
    }
  }catch(error){
    throw new HttpException(409, `something went wrong in Nonce API`);
  }
    

  }

  /**
   * This method runs after passport authentication of user
   *
   * @param userData as user credentials
   * @returns success messge of authentication
   */
  public async login(userData: any): Promise<TokenData> {
    
   const nonce: any = await this.Nonce(userData);
   const message = `Please sign this message none:${nonce}`;
    const signature = userData.signature;
    const recover_address = ethers.utils.verifyMessage(message, signature);
    if (recover_address === userData.publicAddress) { 
     const nonceNew = await Math.floor(Math.random() * 1000000);
      await this.users.update({ nonce: nonceNew }, { where: { publicAddress: userData.publicAddress } });
      
      return this.createToken(recover_address);
    } else {
      throw new HttpException(409, `you did not signed the message ${userData.publicAddress}`);
    }
  }

  /**
     function logout user from session
   *
   * @param userData takes user data which needs to be logged out
   * @returns same user after logout
   */
  public async logout(userData: any): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  /**
   * This function creates tokes taking user data and using JWT
   *
   * @param user takes user data which needs to be logged out
   * @param expiresIn expiry time for token
   * @returns {TokenData} generated token  and expiring time
   */
  public createToken(user: any, expiresIn: number = 60 * 60 * 24 * 15): TokenData {
    //const dataStoredInToken: DataStoredInToken = { id: user.id };
    const publicaddress = user;
    const secretKey: string = SECRET_KEY;

    return { expiresIn, token: sign({ publicAddress: publicaddress }, secretKey, { expiresIn }) };
  }

  /**
   * This function creates one time access token
   *
   * @param userData user data
   * @returns {TokenData} generated token  and expiring time
   */
  public async getOneTimeToken(userData: User): Promise<TokenData> {
    let user: User = await this.users.findOne({ where: { email: userData.email } });
    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8);
      user = await this.users.create({ ...userData, password: randomPassword });
    }
    return this.createToken(user, 60 * 10 * 10 * 24 * 15);
  }

  /**
   * This takes function creates token string with authorization title
   *
   * @param tokenData as input
   * @returns string of token authorization
   */
  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}
export default AuthService;


// import { sign } from 'jsonwebtoken';
// import { SECRET_KEY } from '@config';
// import DB from '@databases';
// import { CreateUserDto } from '@dtos/users.dto';
// import { HttpException } from '@exceptions/HttpException';
// import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
// import { User } from '@interfaces/users.interface';
// import { isEmpty } from '@utils/util';

// /**
//  * This class is service class for user authentication
//  *
//  * @class
//  */
// class AuthService {
//   public users = DB.users;

//   /**
//    * This method takes user data as params and chesks if it is already present in DB
//    * or not if present returns error else register user in DB and returns the same
//    *
//    * @param userData It takes user data (email, Password ) to register into db
//    * @returns  redistered user in DB
//    */
//   public async signup(userData: CreateUserDto): Promise<User> {
//     if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
//     const findUser: User = await this.users.findOne({ where: { email: userData.email } });
//     if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

//     const hashedPassword = await hash(userData.password, 10);
//     const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

//     return createUserData;
//   }

//   /**
//    * This method runs after passport authentication of user
//    *
//    * @returns success messge of authentication
//    */
//   public async login(): Promise<string> {
//     // if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
//     // const findUser: User = await this.users.findOne({ where: { email: userData.email } });
//     // console.log(findUser);
//     // if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);
//     // const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
//     // if (!isPasswordMatching) throw new HttpException(409, 'Password not matching');
//     // const tokenData = this.
//     // findUser;
//     // console.log(tokenData);
//     // const cookie = this.createCookie(tokenData);
//     // return { cookie: '213123', findUser };
//     try {
//       return 'success';
//     } catch (error) {
//       throw error;
//     }
//   }

//   /**
//      function logout user from session
//    *
//    * @param userData takes user data which needs to be logged out
//    * @returns same user after logout
//    */
//   public async logout(userData: User): Promise<User> {
//     if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

//     const findUser: User = await this.users.findOne({ where: { email: userData.email, password: userData.password } });
//     if (!findUser) throw new HttpException(409, "User doesn't exist");

//     return findUser;
//   }

//   /**
//    * This function creates tokes taking user data and using JWT
//    *
//    * @param user takes user data which needs to be logged out
//    * @returns {TokenData} generated token  and expiring time
//    */
//   public createToken(user: User): TokenData {
//     const dataStoredInToken: DataStoredInToken = { id: user.id };
//     const secretKey: string = SECRET_KEY;
//     const expiresIn: number = 60 * 60;

//     return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
//   }

//   /**
//    * This takes function creates token string with authorization title
//    *
//    * @param tokenData as input
//    * @returns string of token authorization
//    */
//   public createCookie(tokenData: TokenData): string {
//     return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
//   }
// }

// export default AuthService;

// // public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: User }> {
// //     if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

// //     const findUser: User = await this.users.findOne({ where: { email: userData.email } });
// //     if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

// //     const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
// //     if (!isPasswordMatching) throw new HttpException(409, 'Password not matching');

// //     const tokenData = this.createToken(findUser);
// //     console.log(tokenData);
// //     const cookie = this.createCookie(tokenData);

// //     return { cookie, findUser };
// //   