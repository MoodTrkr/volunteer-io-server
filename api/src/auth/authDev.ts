import process from 'process';

require('dotenv').config({ path: 'auth/secret-key.env' });
import { expressjwt } from 'express-jwt';
var jwks = require('jwks-rsa');
import { auth } from 'express-oauth2-jwt-bearer';

var checkJwtDev = expressjwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: 'https://dev-dh23pufb.us.auth0.com/.well-known/jwks.json'
	}),
	audience: 'https://quickstarts/mdtkr-api-rest',
	issuer: 'https://dev-dh23pufb.us.auth0.com/',
	algorithms: ['RS256']
});

export {
	checkJwtDev
};