import * as dotenv from 'dotenv';  
dotenv.config();

const wl: Array<string | undefined> = (process.env.CORS_WHITELIST || '').split(',');
wl.push(undefined);

export default {
    guestPermissions: [
        'login',
    ],
    corsWhiteList: wl,
}

