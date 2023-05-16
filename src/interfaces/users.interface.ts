// import { Model } from 'sequelize';
export interface User {
  id: number;
  email: string;
  publicAddress: string;
  firstname: string;
  lastname: string;
  nonce: Number;
  createdAt: Date;
  updatedAt: Date;
}
