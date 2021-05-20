import * as dotenv from 'dotenv'; 
import dotenvExpand from 'dotenv-expand';

dotenvExpand(dotenv.config());

const wl: Array<string | undefined | null> = (process.env.CORS_WHITELIST || '').split(',');
wl.push(undefined);
wl.push(null);

export default {
    guestPermissions: [
        'login',
        'information:read',
        'material:read',
        'collaborator:read',
        'section:read',
        'collaborator:read',
        'calendar:read',
    ],
    corsWhiteList: wl,
}







