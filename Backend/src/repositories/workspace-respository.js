import { StatusCodes } from 'http-status-codes';

import User from '../models/user-model.js';
import Workspace from '../models/workspace-model.js';
import AppError from './../utils/errors/app-error.js';
import ChannelRepository from './channel-respository.js';
import CrudRepository from './crud-repository.js';

const channelRepo = new ChannelRepository();

class WorkspaceRepository extends CrudRepository {
  constructor() {
    super(Workspace);
  }

  async getWorkspaceByName(workspaceName) {
    const workspace = await Workspace.findOne({
      name: workspaceName
    });

    if (!workspace) {
      throw new AppError('Workspace not found', StatusCodes.NOT_FOUND);
    }

    return workspace;
  }

  async getWorkspaceByJoinCode(joinCode) {
    const workspace = await Workspace.findOne({
      joinCode: joinCode
    });

    if (!workspace) {
      throw new AppError('Workspace not found', StatusCodes.NOT_FOUND);
    }

    return workspace;
  }

  async addMemberToWorkspace(workspaceId, memberId, role) {
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      throw new AppError('Workspace not found', StatusCodes.NOT_FOUND);
    }

    // check user(memberId) id valid or not

    const isValidUser = await User.findById(memberId);

    if (!isValidUser) {
      throw new AppError('User not found', StatusCodes.NOT_FOUND);
    }

    // check member already exists or not

    const isMemberAlreadyPartOfWorkspace = workspace.members.find(
      (member) => member.memberId === memberId
    );

    if (isMemberAlreadyPartOfWorkspace) {
      throw new AppError(
        'user already part of workspace',
        StatusCodes.FORBIDDEN
      );
    }

    workspace.members.push({
      memberId,
      role
    });

    await workspace.save();
    return workspace;
  }

  async addChannelToWorkspace(workspaceId, channelName) {
    const workspace =
      await Workspace.findById(workspaceId).populate('channels');

    if (!workspace) {
      throw new AppError('Workspace is not found', StatusCodes.NOT_FOUND);
    }

    const isChannelAlreadyPartOfWorkspace = workspace.channels.find(
      (channel) => channel.name === channelName
    );

    if (isChannelAlreadyPartOfWorkspace) {
      throw new AppError(
        'channel already part of workspace',
        StatusCodes.FORBIDDEN
      );
    }

    const channel = await channelRepo.create({
      name: channelName,
      workspaceId: workspaceId
    });

    workspace.channels.push(channel);

    await workspace.save();
    return workspace;
  }

  async fetchAllWorkspaceByMemberId(memberId) {
    const workspaces = await Workspace.find({
      'members.memberId': memberId
    }).populate('members.memberId', 'username email avatar');

    return workspaces;
  }

  async getWorkspaceDetailsById(workspaceId) {
    const workspace = await Workspace.findById(workspaceId)
      .populate('members.memberId', 'username email avatar')
      .populate('channels');

    return workspace;
  }
}

export default WorkspaceRepository;
