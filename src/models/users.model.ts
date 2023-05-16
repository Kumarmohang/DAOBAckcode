/* eslint-disable prettier/prettier */
/* eslint-disable valid-jsdoc */
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User } from '@interfaces/users.interface';

export type UserCreationAttributes = Optional<User, 'id' | 'email' | 'publicAddress'>;

/**
 * User model class
 */
export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id: number;
  public email: string;
  public publicAddress: string;
  public firstname: string;
  public lastname: string;
  public nonce: Number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

/**
 * Function for creating sequelize user model
 *
 * @param sequelize sequelize
 * @param dataTypes
 * @returns UserModel
 */
export default function createUserModel(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof UserModel {
  UserModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: dataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      publicAddress: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'public_address',
      },
      firstname: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      lastname: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      nonce: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: () => Math.floor(Math.random() * 1000000), // Initialize with a random nonce
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at',
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'users',
    },
  );

  return UserModel;
}
