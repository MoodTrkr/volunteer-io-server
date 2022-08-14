import process from 'process';

require('dotenv').config({ path: 'auth/secret-key.env' });
import { expressjwt } from 'express-jwt';
var jwks = require('jwks-rsa');
import { auth } from 'express-oauth2-jwt-bearer';

const checkJwtDev = auth({
	audience: process.env.AUTH0_AUDIENCE_DEV,
	issuerBaseURL: process.env.AUTH0_ISSUER_DEV
});

export {
	checkJwtDev
};