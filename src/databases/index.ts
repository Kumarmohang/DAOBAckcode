import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, DB_ENGINE } from '@config';
import { logger } from '@utils/logger';
import createUserModel from '@/models/users.model';
import createProposalAssetModel from '@/models/proposalAsset.model';
//import createProposalTypeModel from '@/models/proposals.model';
import getProposalTypeModel from '@models/proposalTypes.model';
import createProposalTimelineModel from '@/models/proposalTimeline.model';
import createTeamMemberModel from '@/models/teamMember.model';
import createProposalModel from '@/models/proposals.model';
import createProposalUpdatesModel from '@/models/proposal.update.model';
import createVoteModel from '@/models/votes.model';
import createVoteSummary from '@/models/voteSummary.model';
import createProposalStatusModel from '@/models/proposalStatus.model';

const ALL_MODEL_ARRAY: Array<Function> = [
  createUserModel,
  createProposalAssetModel,
  getProposalTypeModel,
  createProposalTimelineModel,
  createTeamMemberModel,
  createProposalModel,
  createProposalUpdatesModel,
  createVoteModel,
  createVoteSummary,
  createProposalStatusModel,
];

const db: any = {};
// const DB: any = {};
const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: DB_ENGINE as Sequelize.Dialect,
  host: DB_HOST,
  quoteIdentifiers: false,
  port: Number.parseInt(DB_PORT, 10),
  timezone: '+05:30',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

db['sequelize'] = sequelize;
db['Sequelize'] = Sequelize;

for (let modelCreatFuncIdx = 0, len = ALL_MODEL_ARRAY.length; modelCreatFuncIdx < len; modelCreatFuncIdx += 1) {
  const createdModel = ALL_MODEL_ARRAY[modelCreatFuncIdx](sequelize, Sequelize.DataTypes);
  db[createdModel.name] = createdModel;
}

Object.keys(db).forEach((modelName: string) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

export default db;
