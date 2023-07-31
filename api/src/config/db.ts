import { createConnection, ConnectionOptions } from 'typeorm';
import { Client } from '../entity/Client';
import * as dotenv from 'dotenv';

export const connectServerDB = async () => {

    dotenv.config();

    const dbOptions: ConnectionOptions = {
        type: 'postgres',
        host: process.env.DB_DOCKER_VOLUME,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        synchronize: true, // Warning: the synchronize:true is not recomended to PRD env
        logging: false, // Opcional: show query logs
        entities: [Client], // Add all class entitys
    };

    try {
        const connection = await createConnection(dbOptions);
        console.log(`Api - connected to DB ${connection.options.database}`);

        process.on('SIGINT', () => {
            connection.close().then(() => console.log('Connection closed!'));
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};
