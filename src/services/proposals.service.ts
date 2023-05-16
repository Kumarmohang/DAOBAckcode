/* eslint-disable valid-jsdoc */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable require-jsdoc */
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Proposal } from '@/interfaces/proposals.interface';
import { Request } from 'express';
import { Op } from 'sequelize';
import { InfuraProvider } from '@ethersproject/providers';
import { Wallet } from 'ethers';
import snapshot from '@snapshot-labs/snapshot.js';
import { bodyTemplate } from '@/utils/bodyTemplate';
import _ from 'lodash';
import {replaceSelectorToOriginal} from '@/utils/templateUtils'


/**
 * This is server class for permission controller
 *
 *@class
 */
class ProposalService {
  public proposals = DB.proposals;
  public teamMembers = DB.team_members;
  public proposalAssets = DB.proposal_assets;
  public timeline = DB.proposal_timeline;
  public proposalType = DB.proposal_types;
  public voteSummary = DB.vote_summary;
  public proposalUpdates = DB.proposal_updates;
  public votes = DB.votes;
  public proposalStatus = DB.proposal_status;


  /**
   * This function creates a new proposal.
   *
   * @function
   * @param objectFiles
   * @param userData
   * @param proposalData Api request data
   * @returns newly created proposal details
   */
  public async createProposal(proposalData: Proposal, objectFiles:any, userData): Promise<void> {
    const proposalRequestData:any = proposalData;
    if (isEmpty(proposalRequestData)) throw new HttpException(400, 'Proposal data is empty');
    const proposal: any = {
      title: proposalRequestData.title,
      leadName: proposalRequestData.leadName,
      contactEmail: proposalRequestData.contactEmail,
      organisationWebsite: proposalRequestData.organisationWebsite,
      body: proposalRequestData.body,
      summary: proposalRequestData.summary,
      tags: proposalRequestData.tags,
      background: proposalRequestData.background,
      type: proposalRequestData.type,
      requiredFunding: proposalRequestData.requiredFunding,
      fundingCurrency: proposalRequestData.fundingCurrency,
      area: proposalRequestData.area,
      patentStatus: proposalRequestData.patentStatus,
      stage: proposalRequestData.stage,
      startDate: proposalRequestData.startDate,
      endDate: proposalRequestData.endDate,
      userId: userData.dataValues.id,
    };

    const existingProposals = await this.proposals.findOne({ where: { title: proposalRequestData.title } });
    
    if (existingProposals) throw new HttpException(400, 'This proposal already exists');
    const createdProposal = await this.proposals.create({...proposal});
    
    //get proposal id
    const { id } = createdProposal;

    const createdProposalData = await this.proposals.findOne({
      attributes: [
        'title',
        'leadName',
        'contactEmail',
        'organisationWebsite',
        'body',
        'summary',
        'tags',
        'background',
        'type',
        'requiredFunding',
        'fundingCurrency',
        'area',
        'patentStatus',
        'startDate',
        'endDate',
        'stage',
      ],
      where: { id },
    });

    const { teamMembers, proposalAssets, timeline } = proposalRequestData;
    const teamMembersList = [];
    const proposalAssetsList = [];
    const timelineDataList = [];
    
    try {
      const memberFileObject: any = objectFiles.memberPhotos;
      let photoDestination: any;
      const photoArray: Array<String> = [];
      if (memberFileObject) {
        for (const obj of memberFileObject) {
          const phototFileName = obj.originalname;
          photoArray.push(phototFileName);
          photoDestination = obj.destination;
        }
      }

      const assestFileObject: any = objectFiles.assetsPhoto;
      let assestsDestination: any;
      const assestsFileArray: Array<String> = [];
      if (assestFileObject) {
        for (const obj of assestFileObject) {
          const assestFileName = obj.originalname;
          assestsFileArray.push(assestFileName);
          assestsDestination = obj.destination;
        }
      }

      //fetching details from team_members table
      let photoUrl:string;

      if (teamMembers) {
        for (const member of teamMembers) {
          if (photoArray.length >= 0) {
            for (const photo of photoArray) {
              const photoname = member.name+'.';

              if (photo.includes(photoname)) {
                const memberName: string = photo.split(' ').join('_');
                photoUrl = photoDestination + '/' + memberName;
                break;
              }else{
                photoUrl = '';
              }
            }
          }
          const teamMember = await this.teamMembers.create({
            ...member,
            photoUrl,
            proposalId: id,
          });
          
          const teamMemberData = await this.teamMembers.findOne({
            attributes: ['name', 'role', 'contactEmail', 'designation','photoUrl'],
            where: { id: teamMember.id },
          });
          teamMembersList.push(teamMemberData);
        }
      }

      //Adding thumbnail image data into proposal Assests data
      if(objectFiles.thumbnail){
        const thumbnailUrl = objectFiles.thumbnail[0].path;
      
        const thumbnail = await this.proposalAssets.create({
          url:thumbnailUrl,
          proposalId: id,
          type: 'Link',
          title:'thumbnail'
        });
        const thumbnailData = await this.proposalAssets.findOne({ 
          attributes: ['title', 'type', 'url'], 
          where: { title: 'thumbnail' },
        });
        proposalAssetsList.push(thumbnailData);
      }


      //fetching details from proposal_assets table
      let assestUrl: string;
      let url: string;

      if (proposalAssets) {
        for (const asset of proposalAssets) {
          
          if (assestsFileArray.length >= 0) {
            for (const assetFile of assestsFileArray) {
              if (assetFile.includes(asset.title+'.')) {
                const assetName: string = assetFile.split(' ').join('_');
                assestUrl = assestsDestination + '/' + assetName;
              }
            }
          }

          if (assestUrl) {
            url = assestUrl;
          } else {
            url = asset.url;
          }

          const proposalAsset = await this.proposalAssets.create({
            ...asset,
            url,
            proposalId: id,
          });
          const proposalAssetData = await this.proposalAssets.findOne({ 
            attributes: ['title', 'type', 'url'], 
            where: { id: proposalAsset.dataValues.id },
          });

          proposalAssetsList.push(proposalAssetData);
        }
      }
      
      //fetching details from proposal_timeline table
      if(timeline){
        for (const proposalTimeline of timeline ) {
          const timelines = await this.timeline.create({
            ...proposalTimeline,
            proposalId: id,
          });
          const timelineData = await this.timeline.findOne({
            attributes: ['title', 'requiredFunding', 'status', 'startDate', 'endDate'],
            where: { id: timelines.dataValues.id },
          });
          timelineDataList.push(timelineData);
        }
      }

      //to add days in date
      const addDays = (date: Date, days: number): Date => {
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + days);
        return endDate;
      };
      const date: Date = new Date(proposal.startDate);
      const endDate: Date = addDays(date, 7);

      const voteSummaryData = await this.voteSummary.create({
        proposalId: id,
        totalVotes:0,
        voteYes:0,
        voteNo:0,
        voteAbstain:0,
        startDate:proposal.startDate,
        endDate:endDate,
        status:'active',
      });

      const start = proposalRequestData.startDate;
      const end = proposalRequestData.endDate;
      console.log(start, '|', end);
      const startTimeStamp = Math.floor(Date.parse(start) / 1000);
      const endTimeStamp = Math.floor(Date.parse(end) / 1000);
      const hub = process.env.HUB;
      const client = new snapshot.Client712(hub);

      const provider = new InfuraProvider(process.env.NETWORK, process.env.API_KEY); //JsonRpcProvider(URL);

      const signer = new Wallet(process.env.PRIVATE_KEY, provider);

      const account2 = signer.address;
  
      const blockNumber = await provider.getBlockNumber();
      const projectDetails = JSON.parse(proposalRequestData.body);
      const receipt = await client.proposal(signer, account2, {
        space: process.env.SPACE,
        type: process.env.TYPE, // define the voting system
        title: proposalRequestData.title,
        body: replaceSelectorToOriginal(bodyTemplate, {
          background: proposalRequestData.background,
          body: projectDetails.body || "-",
          impact: projectDetails.impact || "-",
          competativeAdvantages: projectDetails.competativeAdvantages || "-",
          timeline: timeline,
        }),
        choices: [process.env.CHOICE_A, process.env.CHOICE_B, process.env.CHOICE_C],
        start: startTimeStamp,
        end: endTimeStamp,
        snapshot: blockNumber,
        network: process.env.NETWORK_ID,
        plugins: JSON.stringify({}),
        app: process.env.APP, // provide the name of your project which is using this snapshot.js integration
      });
      const snapshot_url = process.env.SNAPSHOT_URL + '#' + process.env.SNAPSHOT_URL2 + receipt.id;

      const updatetable = await this.proposals.update(
        {
          snapshotUrl: snapshot_url,
          proposalSnapshotIdentifier: receipt.id,
        },
        {
          where: { id: id },
        },
      );
    }catch (error) {
      console.log('Id :', id);
      await this.voteSummary.destroy({ where:{proposalId:id}});
      await this.teamMembers.destroy({ where:{proposalId:id}});
      await this.proposalAssets.destroy({ where:{proposalId:id}});
      await this.timeline.destroy({ where:{proposalId:id}});
      await this.voteSummary.destroy({ where:{proposalId:id}});
      await this.proposals.destroy({ where:{id}});

      let errorMessage=error.message;
      if(!error.message){
        errorMessage=error.error+', '+error.error_description;
      }
      throw new HttpException(400, `Could not create proposal: ${errorMessage}`);
    }
    return { ...createdProposalData.dataValues, teamMembers: teamMembersList, proposalAssets: proposalAssetsList, proposalTimeline: timelineDataList };
  }

 
  // Get Proposal Type details
  public async getTypeProposal(): Promise<void> {
    const existingProposals: any = await this.proposalType.findAll();
    if (!existingProposals) throw new HttpException(400, 'This proposal type is not  exist');
    return existingProposals;
  }

  // Get All Proposals

  public async getAllProposals(req: Request): Promise<void> {
    const { search, votingStatus, currentStatus, limit, offset, sort, startDate, endDate } = req.query;

    let searchClause;
    if (search && search != '') {
      searchClause = {
        [Op.or]: [
          {
            type: {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            title: {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            tags: {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            area: {
              [Op.iLike]: `%${search}%`,
            },
          },
        ],
      };
    }

    //currentStatus Clause or Stage clause as per API
    let currentStatusClause;
    if (currentStatus && currentStatus != '') {
      currentStatusClause = {
        currentStatus: currentStatus,
      };
    }
    let startDateClause;
    const startdate = new Date(startDate);
    if (startDate) {
      startDateClause = {
        startDate: {
          [Op.gte]: new Date(`${startdate}`),
        },
      };
    }
    let endDateClause;
    const enddate = new Date(endDate);
    if (endDate) {
      endDateClause = {
        endDate: {
          [Op.lte]: new Date(`${enddate}`),
        },
      };
    }

    const order = [];
    let sort_keys;
    if (sort) {
      sort_keys = sort.split(',');
      sort_keys.map(key => {
        const key_string = key.split('_');
        order.push([key_string[0], key_string[1]]);
      });
    }

    // Voting status Clause
    let VotingStatusClause;
    if (votingStatus && votingStatus !== '') {
      // VotingStatusClause = {
      //   status: votingStatus,
      // };
      const result = await this.proposals.findAll({
        where: { ...searchClause, ...startDateClause, ...endDateClause, ...currentStatusClause },
        limit,
        offset,
        order,
        attributes: [
          'id',
          'title',
          'leadName',
          'contactEmail',
          'organisationWebsite',
          'body',
          'summary',
          'tags',
          'background',
          'type',
          'requiredFunding',
          'fundingCurrency',
          'area',
          'patentStatus',
          'startDate',
          'endDate',
          'stage',
          'currentStatus',
          'snapshotUrl',
        ],
        include: [
          {
            model: this.teamMembers,
            attributes: ['name', 'role', 'contactEmail', 'designation'],
          },
          {
            model: this.timeline,
            attributes: ['title', 'requiredFunding', 'status', 'startDate', 'endDate'],
          },
          {
            model: this.proposalAssets,
            attributes: ['title', 'type', 'url'],
          },
          {
            model: this.proposalUpdates,
            attributes: ['title', 'description', 'timestamp', 'assetUrl'],
          },
          {
            model: this.voteSummary,
            attributes: ['votingStrategy', 'totalVotes', 'voteYes', 'voteNo', 'voteAbstain', 'quorum', 'startDate', 'endDate', 'status'],
            where: {
              status: votingStatus,
            },
            as: "votingDetails",
          },
        ],
      });
      return result;

    }
    console.log("outside the loop")
    return await this.proposals.findAll({
      where: { ...searchClause, ...startDateClause, ...endDateClause, ...currentStatusClause },
      limit,
      offset,
      order,
      attributes: [
        'id',
        'title',
        'leadName',
        'contactEmail',
        'organisationWebsite',
        'body',
        'summary',
        'tags',
        'background',
        'type',
        'requiredFunding',
        'fundingCurrency',
        'area',
        'patentStatus',
        'startDate',
        'endDate',
        'stage',
        'currentStatus',
        'snapshotUrl',
      ],
      include: [
        {
          model: this.teamMembers,
          attributes: ['name', 'role', 'contactEmail', 'designation'],
        },
        {
          model: this.timeline,
          attributes: ['title', 'requiredFunding', 'status', 'startDate', 'endDate'],
        },
        {
          model: this.proposalAssets,
          attributes: ['title', 'type', 'url'],
        },
        {
          model: this.proposalUpdates,
          attributes: ['title', 'description', 'timestamp', 'assetUrl'],
        },
        {
          model: this.voteSummary,
          as: "votingDetails",
          attributes: ['votingStrategy', 'totalVotes', 'voteYes', 'voteNo', 'voteAbstain', 'quorum', 'startDate', 'endDate', 'status'],
        },
      ],
    });
   
  }

  // Get Proposal By ID API function.
  public async getProposalById(req: Request): Promise<void> {
    const data = req.params;
    const proposal = await this.proposals.findOne({
      attributes: [
        'id',
        'title',
        'leadName',
        'contactEmail',
        'organisationWebsite',
        'body',
        'summary',
        'tags',
        'background',
        'type',
        'requiredFunding',
        'fundingCurrency',
        'area',
        'patentStatus',
        'startDate',
        'endDate',
        'stage',
        'currentStatus',
        'snapshotUrl',
      ],
      where: { id: data.id },
    });
    if (!proposal) throw new HttpException(400, 'This proposal Data is not exist');

    const teamMembers = await this.teamMembers.findOne({
      attributes: ['name', 'role', 'contactEmail', 'designation'],
      where: { proposal_id: data.id },
    });
    const teamMemberData = [];
    if(teamMembers){
      teamMemberData.push(teamMembers.dataValues);
    }
    
    const assets = await this.proposalAssets.findOne({ 
      attributes: ['title', 'type', 'url'],
      where: { proposal_id: data.id },
    });
    const assestsData = [];
    if(assets){
      assestsData.push(assets.dataValues);
    }

    const timeline = await this.timeline.findOne({
      attributes: ['title', 'requiredFunding', 'status', 'startDate', 'endDate'],
      where: { proposal_id: data.id },
    });
    const timelineData = [];
    if(timeline){
      timelineData.push(timeline.dataValues);
    }

    const proposalupdates = await this.proposalUpdates.findOne({
      attributes: ['title', 'description', 'timestamp', 'assetUrl'],
      where: { proposal_id: data.id },
    });
    const proposalupdate=[];
    if(proposalupdates){
      proposalupdate.push(proposalupdates.dataValues);
    }
    
    const votedValue = await this.voteSummary.findOne({
      attributes: ['votingStrategy', 'totalVotes', 'voteYes', 'voteNo', 'voteAbstain', 'quorum', 'startDate', 'endDate', 'status'],
      where: { proposal_id: data.id },
    });
    const votedValues=[];
    if(votedValue){
      votedValues.push(votedValue.dataValues);
    }
  
    const finalOutput = {
      ...proposal?.dataValues,
      teamMembers: teamMemberData,
      proposalAssets: assestsData,
      timeline: timelineData,
      proposalUpdates:proposalupdate,
      votingDetails: votedValues,
    };
    return finalOutput;
  }

  //get vote details by id
  public async getProposalvoteDetailsById(req: Request): Promise<void> {
    const data:any = req.params;
    const proposal = await this.proposals.findOne({
      attributes: [
        'id',
        'title',
        'leadName',
        'contactEmail',
        'organisationWebsite',
        'body',
        'summary',
        'tags',
        'background',
        'type',
        'requiredFunding',
        'fundingCurrency',
        'area',
        'patentStatus',
        'startDate',
        'endDate',
        'stage',
        'currentStatus',
      ],
      where: { id: data.id },
    });
    if (!proposal) throw new HttpException(400, 'This proposal Data is not exist');
    const proposalId: any = proposal.id;

    const votedValue = await this.voteSummary.findOne({
      attributes: [
        'votingStrategy',
        'totalVotes',
        'voteYes',
        'voteNo',
        'voteAbstain',
        'quorum',
        'startDate',
        'endDate',
        'status'],
      where: { proposal_id: data.id },
    });
    
    if (!votedValue) throw new HttpException(400, 'This Proposal Id not exist in VoteSummary Table');

    const ProposalvoteDetail:any = {
      id: proposalId,
      votingDetails: [votedValue?.dataValues],
    };
    return ProposalvoteDetail;
  }

  //get proposal life cycle details details by id
  public async getProposalLifecycleDetailsById(req: Request): Promise<void> {
    const data = req.params;
    const proposal = await this.proposals.findOne({
      attributes: [
        'id',
        'title',
        'leadName',
        'contactEmail',
        'organisationWebsite',
        'body',
        'summary',
        'tags',
        'background',
        'type',
        'requiredFunding',
        'fundingCurrency',
        'area',
        'patentStatus',
        'startDate',
        'endDate',
        'stage',
        'currentStatus',
      ],
      where: { id: data.id },
    });
    if (!proposal) throw new HttpException(400, 'This proposal Data is not exist');
    const proposalId: any = proposal.id;

    const status = await this.proposalStatus.findOne({
      attributes: ['startDate', 'endDate', 'status'],
      where: { proposal_id: data.id },
    });
    if (!status) throw new HttpException(400, 'This Proposal Id not exist in Proposal status Table');

    const proposalLifecycleDetails:any = {
      id: proposalId,
      proposalLifecycle: [status?.dataValues],
    };
    return proposalLifecycleDetails;
  }
}
export default ProposalService;

 
