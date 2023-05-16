import { IsString, IsEmail } from 'class-validator';

/**
 * This class defines the user Data Transfer Object
 *
 * @class
 */
export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
