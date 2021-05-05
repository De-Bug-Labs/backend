import * as dotenv from 'dotenv';  
dotenv.config();

const wl: Array<string | undefined | null> = (process.env.CORS_WHITELIST || '').split(',');
wl.push(undefined);
wl.push(null);

export default {
    guestPermissions: [
        'login',
    ],
    corsWhiteList: wl,
}

