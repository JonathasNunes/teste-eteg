import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';

import { connectServerDB } from './config/db';
import { routerClient } from './routes/client';

/**
 * Create the application
 */
export const app = express();

/**
 * Releases access to services
 */
app.use(cors());

/**
 * Accept and parse JSON
 */
app.use(bodyParser.json());

/**
 * Log config
 */
app.use(logger('dev'));


/**
 * Connect to DB
 */
connectServerDB();

/**
 * Route config
 */
app.use('/api/client', routerClient);
app.use('/', (req, res) => res.send('TesteEteg Api'));