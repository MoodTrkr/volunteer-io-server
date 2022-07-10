import express, { Request, Response } from 'express';
import http from 'http';
import https from 'https';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv'
import fs from 'fs';

import usageDataRoutes from './routes/usageData/usageDataRoutes';
import middleware from './controllers/util/middleware';
import { auth } from 'express-oauth2-jwt-bearer';

import { hourlyRun } from './sync/sync';

require('dotenv').config({ path: 'api.env' });

console.log(
    "DB ACCESS \n",
    "USER:", process.env.PGUSER, "\n",
    "HOST:", process.env.PGHOST, "\n",
    //"PASS:", process.env.PGPASSWORD, "\n",
    "DB_NAME:", process.env.PGDATABASE, "\n",
    "PORT:", process.env.PGPORT, "\n",
    'DB URL: ', process.env.DATABASE_URL
);


const router = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */


// router.set("views", path.join(__dirname, "views"));
// router.use(express.static(path.join(__dirname, "public")));
router.use(middleware.bodyParser());
router.use(middleware.consoleDisplay());
router.use(middleware.urlEncoding())
// router.use(express.json());//parse requests as json objects


/**
 * Routes Definitions
 */
router.use('/api/v1/usage-data', usageDataRoutes);

//timed method set-up
// setInterval(hourlyRun, 20000);
setInterval(hourlyRun, 3600000);

/**
 * SSL Check
 */
// const privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
// const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
// const credentials = { key: privateKey, cert: certificate };

/**
 * Server Activation
 */
const httpServer = http.createServer(router);
httpServer.listen(port, () => {
    console.log(`HTTP: Listening to requests on http://localhost:${port}`);
});