/* eslint-disable jsdoc/require-returns-check */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import ProposalController from '@controllers/proposals.controller';
import AuthServiceJwt from '@/middlewares/passportJwt.auth';
import { celebrate } from 'celebrate';
import { createProposalSchema } from '../dtos/proposals.dto';
import { upload } from '@/middlewares/fileUpload.middleware';

/**
 * ProposalRoute class
 *
 * @implements {Routes}
 */
class ProposalRoute implements Routes {
  public path = '/proposal';
  public router = Router();
  public proposalController = new ProposalController();
  cpUpload = upload.fields([
    { name: 'memberPhotos', maxCount: 10 },
    { name: 'assetsPhoto', maxCount: 10 },
    { name: 'thumbnail', maxCount: 1 },
  ]);

  /**
   * Route constructor
   */
  constructor() {
    this.initializeRoutes();
  }

  /**
   * this function init all routes related to project controller
   *
   * @returns proposalDetails - proposal details
   */
  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      AuthServiceJwt.required,
      this.cpUpload,
      celebrate({ body: createProposalSchema }, { allowUnknown: true }),
      this.proposalController.createProposal,
    );
    this.router.get(
      `${this.path}/type`,
      //AuthServiceJwt.requried,
      this.proposalController.getProposalTypes,
    );
    this.router.get(`${this.path}/:id`, this.proposalController.getProposalById);
    this.router.get(`${this.path}`, this.proposalController.getAllProposals);
    this.router.get(`${this.path}/:id/voteDetails`, this.proposalController.getProposalvoteDetailsById);
    this.router.get(`${this.path}/lifecycle/:id`, this.proposalController.getProposalLifecycleDetailsById);
  }
}
export default ProposalRoute;
