/* eslint-disable valid-jsdoc */
import { ProposalTypes } from '@/interfaces/proposalTypes.interface';
//import uuid from 'uuid/v4';
import { Sequelize, Model, Optional, DataTypes } from 'sequelize';

export type ProposalTypeCreationAttributes = Optional<ProposalTypes, 'id' | 'type_name' | 'description'>;
/**
 * Proposal model class
 */
export class ProposalTypeModel extends Model<ProposalTypes, ProposalTypeCreationAttributes> implements ProposalTypes {
  public id: string;
  public type_name: string;
  public description: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

/**
 * Function for creating sequelize project model
 *
 * @param sequelize sequelize
 // eslint-disable-next-line valid-jsdoc
 * @param dataTypes
 * @returns ProposalModel
 */
export default function createProposalModel(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof ProposalTypeModel {
  ProposalTypeModel.init(
    {
      id: {
        primaryKey: true,
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        allowNull: false,
      },
      type_name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      description: {
        field: 'description',
        type: dataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: dataTypes.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: dataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: 'proposal_types',
      modelName: 'proposal_types',
    },
  );

  return ProposalTypeModel;
}
