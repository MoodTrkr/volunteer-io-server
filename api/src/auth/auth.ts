import { auth } from 'express-oauth2-jwt-bearer';
import process from 'process';
require('dotenv').config({ path: 'auth/secret-key.env' });

const checkJwt = auth({
	audience: process.env.AUTH0_AUDIENCE,
	issuerBaseURL: process.env.AUTH0_ISSUER,
	jwksUri: process.env.AUTH0_JWKS_URI
});

export {
	checkJwt
};