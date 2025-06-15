import { Config } from "../../config/serverConfig.js";


export const workspaceJoinMail = (workspaceName) => {
    return {
        from: Config.MAIL_ID,
        subject: 'You have been added to a workspace',
        text: `Congratulations you have been added to the workspace ${workspaceName}`

    }
}