/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import { Sequelize, Model, Optional, DataTypes } from 'sequelize';
import uuid from 'uuid/v4';
import { ProposalStatus } from '@/interfaces/proposalStatus.interface';

export type ProposalStatusCreationAttributes = Optional<ProposalStatus, 'id' | 'proposalId' | 'startDate' | 'endDate' | 'status'>;
/**
 * ProposalAsset model class
 */
export class ProposalStatusModel extends Model<ProposalStatus, ProposalStatusCreationAttributes> implements ProposalStatus {
  public id: string;
  public proposalId: string;
  public status: string;

  public readonly startDate!: Date;
  public readonly endDate!: Date;

  // static associate(models) {
  //   ProposalStatusModel.belongsTo(models.proposals, {
  //     foreignKey: 'proposal_id',
  //     targetKey: 'id',
  //     as: 'proposal_id',
  //   });
  //   models.proposals.hasOne(ProposalStatusModel, {
  //     foreignKey: 'proposal_id',
  //     sourceKey: 'id',
  //   });
  // }
}

/**
 * Function for creating sequelize project model
 *
 * @param sequelize sequelize
 * @param dataTypes
 * @returns ProposalAssetModel
 */
export default function createProposalStatusModel(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof ProposalStatusModel {
  ProposalStatusModel.init(
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
        type: dataTypes.ENUM('completed', 'failed', 'ongoing'),
      },
    },
    {
      sequelize,
      modelName: 'proposal_status',
    },
  );
  ProposalStatusModel.beforeCreate(proposalStatus => (proposalStatus.id = uuid()));
  return ProposalStatusModel;
}
