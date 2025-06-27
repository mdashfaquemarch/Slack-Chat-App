import { StatusCodes } from 'http-status-codes';

import {
  addChannelToWorkspaceService,
  addMemberToWorkspaceService,
  createWorkspaceService,
  deleteWorkspaceService,
  getWorkspaceByJoinCodeService,
  getWorkspaceService,
  getWorkspacesUserIsMemberOfService,
  updateWorkspaceService
} from '../services/workspace-service.js';

async function createWorkspaceController(req, res, next) {
  try {
    const response = await createWorkspaceService({
      ...req.body,
      owner: req.user
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'workspace created successfully',
      data: response,
      error: {}
    });
  } catch (error) {
    next(error);
  }
}

async function getWorkspacesUserIsMemberOfController(req, res, next) {
  try {
    const response = await getWorkspacesUserIsMemberOfService(req.user);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'get user workspaces successfully',
      data: response,
      error: {}
    });
  } catch (error) {
    next(error);
  }
}

async function deleteWorkspaceController(req, res, next) {
  try {
    const response = await deleteWorkspaceService(
      req.params.workspaceId,
      req.user
    );

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'workspace deleted successfully',
      data: response,
      error: {}
    });
  } catch (error) {
    next(error);
  }
}

async function getWorkspaceController(req, res, next) {
  try {
    const response = await getWorkspaceService(
      req.params.workspaceId,
      req.user
    );

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'workspace fetched successfully',
      data: response,
      error: {}
    });
  } catch (error) {
    next(error);
  }
}

async function getWorkspaceByJoinCodeController(req, res, next) {
  try {
    const response = await getWorkspaceByJoinCodeService(
      req.params.joinCode,
      req.user
    );
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'workspace joined successfully',
      data: response,
      error: {}
    });
  } catch (error) {
    next(error);
  }
}
async function updateWorkspaceController(req, res, next) {
  try {
    const response = await updateWorkspaceService(
      req.params.workspaceId,
      req.body,
      req.user
    );
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'workspace updated successfully',
      data: response,
      error: {}
    });
  } catch (error) {
    next(error);
  }
}

async function addMemberToWorkspaceController(req, res, next) {
  try {
    const response = await addMemberToWorkspaceService(
      req.params.workspaceId,
      req.body.memberId,
      req.body.role || 'member',
      req.user
    );
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'added user in workspace  successfully',
      data: response,
      error: {}
    });
  } catch (error) {
    next(error);
  }
}
async function addChannelToWorkspaceController(req, res, next) {
  try {
    const response = await addChannelToWorkspaceService(
      req.params.workspaceId,
      req.body.channelName,
      req.user
    );
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'added channel to workspace successfully',
      data: response,
      error: {}
    });
  } catch (error) {
    next(error);
  }
}

export {
  addChannelToWorkspaceController,
  addMemberToWorkspaceController,
  createWorkspaceController,
  deleteWorkspaceController,
  getWorkspaceByJoinCodeController,
  getWorkspaceController,
  getWorkspacesUserIsMemberOfController,
  updateWorkspaceController};
