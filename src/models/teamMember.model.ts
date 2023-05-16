/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import { Sequelize, Model, Optional, DataTypes } from 'sequelize';
import { TeamMember } from '@interfaces/teamMember.interface';
import uuid from 'uuid/v4';

export type MemberCreationAttributes = Optional<
  TeamMember,
  'id' | 'proposalId' | 'name' | 'role' | 'contactEmail' | 'designation' | 'photoUrl' | 'profileUrl'
>;
/**
 * TeamMember model class
 */
export class TeamMemberModel extends Model<TeamMember, MemberCreationAttributes> implements TeamMember {
  public id: string;
  public proposalId: string;
  public name: string;
  public role: string;
  public contactEmail: string;
  public designation: string;
  public photoUrl: string;
  public profileUrl: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models) {
    TeamMemberModel.belongsTo(models.proposals, {
      foreignKey: 'proposal_id',
      targetKey: 'id',
    });
    models.proposals.hasMany(TeamMemberModel, {
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
 * @returns TeamMemberModel
 */
export default function createTeamMemberModel(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof TeamMemberModel {
  TeamMemberModel.init(
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
      name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      contactEmail: {
        field: 'contact_email',
        type: dataTypes.STRING,
        allowNull: false,
      },
      designation: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      photoUrl: {
        field: 'photo_url',
        type: dataTypes.STRING,
      },
      profileUrl: {
        field: 'profile_url',
        type: dataTypes.STRING,
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
      modelName: 'team_members',
    },
  );
  TeamMemberModel.beforeCreate(teamMember => (teamMember.id = uuid()));
  return TeamMemberModel;
}
