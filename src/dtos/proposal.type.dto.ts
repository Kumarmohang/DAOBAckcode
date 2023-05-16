import Joi from 'joi';

export const createProposalTypeSchema = Joi.object({
  type_name: Joi.string().required(),
  description: Joi.string().required(),
});
