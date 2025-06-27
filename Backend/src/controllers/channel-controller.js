import { StatusCodes } from 'http-status-codes';

import { getChannelByIdService } from '../services/channel-service.js';

async function getChannelByIdController(req, res, next) {
  try {
    const response = await getChannelByIdService(
      req.params.channelId,
      req.user
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      data: response,
      message: 'channel fetched successfully'
    });
  } catch (error) {
    next(error);
  }
}

export { getChannelByIdController };
