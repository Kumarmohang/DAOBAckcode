import Joi from 'joi';

export const createProposalSchema = Joi.object({
  title: Joi.string().required(),
  leadName: Joi.string().required(),
  contactEmail: Joi.string().required(),
  organisationWebsite: Joi.string().optional(),
  body: Joi.string().required(),
  summary: Joi.string().required(),
  tags: Joi.string().optional(),
  background: Joi.string().optional(),
  type: Joi.string().optional(),
  requiredFunding: Joi.number().required(),
  fundingCurrency: Joi.string().required(),
  area: Joi.string().optional(),
  patentStatus: Joi.string().optional(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  teamMembers: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      role: Joi.string().optional(),
      contactEmail: Joi.string().optional(),
      designation: Joi.string().optional(),
    }),
  ),

  proposalAssets: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      type: Joi.string().optional(),
      url: Joi.string().optional(),
    }),
  ),

  timeline: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      requiredFunding: Joi.number().required(),
      status: Joi.string().required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
    }),
  ),
  memberPhotos: Joi.array().items().optional(),
  assetsPhoto: Joi.array().items().optional(),
});
