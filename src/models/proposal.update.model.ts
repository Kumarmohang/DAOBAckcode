/* eslint-disable prettier/prettier */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import { Sequelize, Model, Optional, DataTypes } from 'sequelize';
import { ProposalUpdate } from '@interfaces/proposal.update.interface';
import uuid from 'uuid/v4';

export type ProposalAssetCreationAttributes = Optional<ProposalUpdate, 'id' | 'proposalId' | 'timestamp' | 'assetUrl' >;
/**
 * ProposalAsset model class
 */
export class ProposalUpdatesModel extends Model<ProposalUpdate, ProposalAssetCreationAttributes> implements ProposalUpdate {
  public id: string;
  public proposalId: string;
  public timestamp: Date;
  public assetUrl: string;
  public assetType: string;
  public title: string;
  public description: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  static associate(models) {
    ProposalUpdatesModel.belongsTo(models.proposals, {
      foreignKey: 'proposal_id',
      targetKey: 'id',
    });
    models.proposals.hasMany(ProposalUpdatesModel, {
      foreignKey: 'proposal_id',
      sourceKey: 'id',
    });
  }
}

/**
 * Function for creating sequelize project model
 *
 * @param sequelize sequelize
 * @param dataTypes
 * @returns ProposalAssetModel
 */
export default function createProposalUpdatesModel(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof ProposalUpdatesModel {
  ProposalUpdatesModel.init(
    {
      id: {
        primaryKey: true,
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        allowNull: false,
      },
      proposalId: {
        field: 'proposal_id',
        type: dataTypes.UUID,
        allowNull: false,
        references: {
          model: 'proposals',
          key: 'id',
        },
      },
      timestamp: {
        type: dataTypes.DATE,
      },
      assetUrl: {
        type: dataTypes.STRING,
        allowNull: false,
        field: 'asset_url',
      },
      assetType: {
        type: dataTypes.STRING,
        field: 'asset_type',
      },
      title: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: dataTypes.TEXT,
      },
      createdAt: {
        field: 'created_at',
        type: dataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: dataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'proposal_updates',
      tableName: 'proposal_updates',
    },
  );
  ProposalUpdatesModel.beforeCreate(proposalupdate => (proposalupdate.id = uuid()));
  return ProposalUpdatesModel;
}
