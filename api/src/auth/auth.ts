import process from 'process';

require('dotenv').config({ path: 'auth/secret-key.env' });
import { expressjwt } from 'express-jwt';
var jwks = require('jwks-rsa');
import { auth } from 'express-oauth2-jwt-bearer';

// var checkJwt = expressjwt({
// 	secret: jwks.expressJwtSecret({
// 		cache: true,
// 		rateLimit: true,
// 		jwksRequestsPerMinute: 5,
// 		jwksUri: process.env.AUTH0_JWKS_URI
// 	}),
// 	audience: process.env.AUTH0_AUDIENCE,
// 	issuer: process.env.AUTH0_ISSUER,
// 	algorithms: ['RS256']
// });

const checkJwt = auth({
	audience: 'YOUR_API_IDENTIFIER',
	issuerBaseURL: `https://YOUR_DOMAIN/`,
});

export {
	checkJwt
};