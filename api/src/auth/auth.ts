import { auth } from 'express-oauth2-jwt-bearer';
require('dotenv').config({ path: 'auth/secret-key.env' });

const checkJwt = auth({
	audience: process.env.AUTH0_AUDIENCE,
	issuerBaseURL: process.env.AUTH0_ISSUER
});

export {
	checkJwt
};