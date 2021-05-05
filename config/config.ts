import * as dotenv from 'dotenv';  
dotenv.config();

export default {
    guestPermissions: [
        'login',
    ],
    corsWhiteList: (process.env.CORS_WHITELIST || '').split(',');
}

