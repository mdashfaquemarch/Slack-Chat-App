import { z } from 'zod';

const workspaceSchema = z.object({
  name: z.string().min(3).max(50)
});

const addMemberToWorkspaceSchema = z.object({
  memberId: z.string()
});

const addChannelToWorkspaceSchema = z.object({
  channelName: z.string()
});

export {
  workspaceSchema,
  addMemberToWorkspaceSchema,
  addChannelToWorkspaceSchema
};
