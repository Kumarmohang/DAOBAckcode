/* eslint-disable prettier/prettier */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import { Sequelize, Model, Optional, DataTypes } from 'sequelize';
import { Votes } from '@interfaces/votes.interface';
import uuid from 'uuid/v4';

export type ProposalAssetCreationAttributes = Optional<Votes, 'id' | 'proposalId' | 'publicAddress' | 'voteStatus'>;
/**
 * ProposalAsset model class
 */
export class votesModel extends Model<Votes, ProposalAssetCreationAttributes> implements Votes {
  public id: string;
  public proposalId: string;
  public publicAddress: string;
  public voteStatus: string;
  public votePower: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models) {
    votesModel.belongsTo(models.proposals, {
      foreignKey: 'proposal_id',
      targetKey: 'id',
    });
    models.proposals.hasMany(votesModel, {
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
export default function createVoteModel(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof votesModel {
  votesModel.init(
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
      publicAddress: {
        type: dataTypes.STRING,
        allowNull: false,
        field: 'public_address',
      },
      voteStatus: {
        type: dataTypes.STRING,
        allowNull: false,
        field: 'vote_status',
      },
      votePower: {
        type: dataTypes.STRING,
        field: 'voting_power',
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
      modelName: 'votes',
      tableName: 'votes',
    },
  );
  votesModel.beforeCreate(vote => (vote.id = uuid()));
  return votesModel;
}
