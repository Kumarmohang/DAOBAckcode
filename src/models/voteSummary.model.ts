/* eslint-disable prettier/prettier */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import { Sequelize, Model, Optional, DataTypes } from 'sequelize';
import { VoteSummary } from '@interfaces/vote.summary.interface';
import uuid from 'uuid/v4';

export type ProposalAssetCreationAttributes = Optional<VoteSummary, 'id' | 'proposalId' | 'votingStrategy' | 'totalVotes'>;
/**
 * ProposalAsset model class
 */
export class voteSummaryModel extends Model<VoteSummary, ProposalAssetCreationAttributes> implements VoteSummary {
  public id: string;
  public proposalId: string;
  public votingStrategy: string;
  public totalVotes: string;
  public voteYes: number;
  public voteNo: number;
  public voteAbstain: number;
  public quorum: number;
  public startDate: Date;
  public endDate: Date;
  public status: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models) {
    voteSummaryModel.belongsTo(models.proposals, {
      as:'votingDetails',
      foreignKey: 'proposal_id',
      targetKey: 'id',
    });
    models.proposals.hasOne(voteSummaryModel, {
      foreignKey: 'proposal_id',
      sourceKey: 'id',
      as:'votingDetails',
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
export default function createVoteSummary(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof voteSummaryModel {
  voteSummaryModel.init(
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
      votingStrategy: {
        type: dataTypes.STRING,
        allowNull: false,
        field: 'voting_strategy',
        defaultValue:'staking-erc20-getBalance-of',
      },
      totalVotes: {
        type: dataTypes.NUMBER,
        allowNull: false,
        field: 'total_votes',
      },
      voteYes: {
        type: dataTypes.NUMBER,
        field: 'vote_yes',
        allowNull: false,
      },
      voteNo: {
        field: 'vote_no',
        type: dataTypes.NUMBER,
        allowNull: false,
      },
      voteAbstain: {
        type: dataTypes.NUMBER,
        field: 'vote_abstain',
        allowNull: false,
      },
      quorum: {
        type: dataTypes.NUMBER,
        allowNull: false,
        defaultValue:10000,
      },
      startDate: {
        type: dataTypes.DATE,
        field: 'start_date',
      },
      endDate: {
        type: dataTypes.DATE,
        field: 'end_date',
      },
      status: {
        type: dataTypes.ENUM('passed', 'failed', 'active', 'not active'),
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
      modelName: 'vote_summary',
      tableName: 'vote_summary',
    },
  );
  voteSummaryModel.beforeCreate(votesummary => (votesummary.id = uuid()));
  return voteSummaryModel;
}
