/* eslint-disable prettier/prettier */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import { Sequelize, Model, Optional, DataTypes } from 'sequelize';
import { Proposal } from '@interfaces/proposals.interface';
import uuid from 'uuid/v4';

export type ProposalCreationAttributes = Optional<
  Proposal,
  | 'id'
  | 'title'
  | 'leadName'
  | 'userId'
  | 'contactEmail'
  | 'organisationWebsite'
  | 'body'
  | 'currentStatus'
  | 'summary'
  | 'tags'
  | 'background'
  | 'type'
  | 'requiredFunding'
  | 'fundingCurrency'
  | 'area'
  | 'patentStatus'
  | 'stage'
  | 'snapshotUrl'
  | 'proposalSnapshotIdentifier'
>;
/**
 * Proposal model class
 */
export class ProposalModel extends Model<Proposal, ProposalCreationAttributes> implements Proposal {
  
  public id: string;
  public title: string;
  public leadName: string;
  public userId: string;
  public contactEmail: string;
  public organisationWebsite: string;
  public body: string;
  public currentStatus: string;
  public proposalSnapshotIdentifier: string;
  public summary: string;
  public tags: string[];
  public background: string;
  public type: string;
  public requiredFunding: number;
  public fundingCurrency: string;
  public area: string;
  public patentStatus: string;
  public stage: string;
  public snapshotUrl: string;

  public readonly startDate!: Date;
  public readonly endDate!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

/**
 * Function for creating sequelize project model
 *
 * @param sequelize sequelize
 * @param dataTypes
 * @returns ProposalModel
 */
export default function createProposalModel(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof ProposalModel {
  ProposalModel.init(
    {
      id: {
        primaryKey: true,
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        allowNull: false,
      },
      title: {
        type: dataTypes.TEXT,
        allowNull: false,
      },
      leadName: {
        field: 'lead_name',
        type: dataTypes.STRING,
        allowNull: false,
      },
      userId:{
        field: 'user_id',
        type: dataTypes.UUID,
      },
      contactEmail: {
        field: 'contact_email',
        type: dataTypes.STRING,
        allowNull: false,
      },
      organisationWebsite: {
        field: 'organisation_website',
        type: dataTypes.STRING,
      },
      body: {
        type: dataTypes.TEXT,
        allowNull: false,
      },
      currentStatus: {
        field: 'current_status',
        type: dataTypes.ENUM('created', 'ongoing', 'completed', 'failed'),
        defaultValue: 'created',
      },
      summary: {
        type: dataTypes.TEXT,
      },
      tags: {
        type: dataTypes.STRING,
      },
      background: {
        type: dataTypes.STRING,
      },
      type: {
        type: dataTypes.TEXT,
      },
      requiredFunding: {
        field: 'required_funding',
        type: dataTypes.INTEGER,
      },
      fundingCurrency: {
        field: 'funding_currency',
        type: dataTypes.STRING,
      },
      area: {
        type: dataTypes.STRING,
      },
      patentStatus: {
        field: 'patent_status',
        type: dataTypes.ENUM('filed', 'pending', 'received', 'not filed'),
      },
      startDate: {
        field: 'start_date',
        type: dataTypes.DATE,
      },
      endDate: {
        field: 'end_date',
        type: dataTypes.DATE,
      },
      stage: {
        type: dataTypes.STRING,
      },
      snapshotUrl: {
        type: dataTypes.STRING,
        field: 'snapshot_url',
        allowNull: true,
      },
      proposalSnapshotIdentifier:{
        field:'proposal_snapshot_identifier',
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
      tableName: 'proposals',
      modelName: 'proposals',
    },
  );
  ProposalModel.beforeCreate(proposal => (proposal.id = uuid()));
  return ProposalModel;
}
