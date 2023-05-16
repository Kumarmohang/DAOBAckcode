import { Request, Response } from 'express';
import ProposalService from '@services/proposals.service';
//import { Proposal } from '@/interfaces/proposals.interface';
import handleResponse from '../utils/response';
import { Proposal } from '@/interfaces/proposals.interface';

/**
 * @typedef Controller
 * @param {Request} req user request
 * @param {Response} res user response
 * @returns {void} void
 */

/**
 * This class has all the methods to control proposal table
 *
 * @class
 * @param req as request
 * @param res as response
 */
class ProposalController {
  public proposalService = new ProposalService();

  /**
   * Controller function for creating new project
   *
   * @param req user request
   * @param res user response
   * @param _next next function
   * @returns nothing
   */
  public createProposal = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData: any = req.user;
      const objectfiles: any = req.files;
      const proposal: Proposal = req.body;
      const createProposalData = await this.proposalService.createProposal(proposal, objectfiles, userData);
      handleResponse.success(res, createProposalData, 201);
    } catch (error) {
      console.log('err', error);
      handleResponse.error(res, error, error.errorCode);
    }
  };
  public getProposalTypes = async (req: Request, res: Response): Promise<void> => {
    try {
      const getProposalType = await this.proposalService.getTypeProposal();
      handleResponse.success(res, getProposalType, 201);
    } catch (error) {
      console.log('error is ', error);
      handleResponse.error(res, error, error.errorCode);
    }
  };
  public getProposalById = async (req: Request, res: Response): Promise<void> => {
    try {
      const ProposalById = await this.proposalService.getProposalById(req);
      handleResponse.success(res, ProposalById, 200);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };
  public getAllProposals = async (req: Request, res: Response): Promise<void> => {
    try {
      const getAllProposal = await this.proposalService.getAllProposals(req);
      handleResponse.success(res, getAllProposal, 200);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };
  public getProposalvoteDetailsById = async (req: Request, res: Response): Promise<void> => {
    try {
      const voteDetailsById = await this.proposalService.getProposalvoteDetailsById(req);
      handleResponse.success(res, voteDetailsById, 200);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };
  public getProposalLifecycleDetailsById = async (req: Request, res: Response): Promise<void> => {
    try {
      const voteDetailsById = await this.proposalService.getProposalLifecycleDetailsById(req);
      handleResponse.success(res, voteDetailsById, 200);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };
}

export default ProposalController;
