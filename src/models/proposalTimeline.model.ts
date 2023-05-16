/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import { Sequelize, Model, Optional, DataTypes } from 'sequelize';
import { ProposalTimeline } from '@interfaces/proposalTimeline.interface';
import uuid from 'uuid/v4';

export type TimelineCreationAttributes = Optional<ProposalTimeline, 'id' | 'proposalId' | 'title' | 'requiredFunding' | 'status'>;
/**
 * ProposalAsset model class
 */
export class ProposalTimelineModel extends Model<ProposalTimeline, TimelineCreationAttributes> implements ProposalTimeline {
  public id: string;
  public proposalId: string;
  public title: string;
  public requiredFunding: number;
  public status: string;

  public readonly startDate!: Date;
  public readonly endDate!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models) {
    ProposalTimelineModel.belongsTo(models.proposals, {
      foreignKey: 'proposal_id',
      targetKey: 'id',
    });
    models.proposals.hasMany(ProposalTimelineModel, {
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
 * @returns ProposalTimelineModel
 */
export default function createProposalTimelineModel(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof ProposalTimelineModel {
  ProposalTimelineModel.init(
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
      title: {
        type: dataTypes.STRING,
      },
      requiredFunding: {
        field: 'required_funding',
        type: dataTypes.INTEGER,
      },
      startDate: {
        field: 'start_date',
        type: dataTypes.DATE,
      },
      endDate: {
        field: 'end_date',
        type: dataTypes.DATE,
      },
      status: {
        type: dataTypes.STRING,
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
      modelName: 'proposal_timeline',
    },
  );
  ProposalTimelineModel.beforeCreate(proposalTimeline => (proposalTimeline.id = uuid()));
  return ProposalTimelineModel;
}
