import process from 'process';

require('dotenv').config({ path: 'auth/secret-key.env' });
import { expressjwt } from 'express-jwt';
var jwks = require('jwks-rsa');

var checkJwt = expressjwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: process.env.AUTH0_JWKS_URI
	}),
	audience: process.env.AUTH0_AUDIENCE,
	issuer: process.env.AUTH0_ISSUER,
	algorithms: ['RS256']
});

export {
	checkJwt
};