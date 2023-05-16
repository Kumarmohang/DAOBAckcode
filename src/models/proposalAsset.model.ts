/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import { Sequelize, Model, Optional, DataTypes } from 'sequelize';
import { ProposalAsset } from '@interfaces/proposalAssets.interface';
import uuid from 'uuid/v4';

export type ProposalAssetCreationAttributes = Optional<ProposalAsset, 'id' | 'proposalId' | 'url' | 'type' | 'title' | 'extension'>;
/**
 * ProposalAsset model class
 */
export class ProposalAssetModel extends Model<ProposalAsset, ProposalAssetCreationAttributes> implements ProposalAsset {
  public id: string;
  public proposalId: string;
  public url: string;
  public type: string;
  public title: string;
  public extension: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models) {
    ProposalAssetModel.belongsTo(models.proposals, {
      foreignKey: 'proposal_id',
      targetKey: 'id',
    });
    models.proposals.hasMany(ProposalAssetModel, {
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
export default function createProposalAssetModel(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof ProposalAssetModel {
  ProposalAssetModel.init(
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
      url: {
        type: dataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: dataTypes.STRING,
      },
      title: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      extension: {
        type: dataTypes.STRING,
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
      modelName: 'proposal_assets',
    },
  );
  ProposalAssetModel.beforeCreate(proposalAsset => (proposalAsset.id = uuid()));
  return ProposalAssetModel;
}
