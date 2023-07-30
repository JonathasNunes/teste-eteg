import { createConnection } from 'typeorm';

export const connectServerDB = async () => {
    const connection = await createConnection();
    console.log(`Api - connected to DB ${connection.options.database}`);

    process.on('SIGINT', () => {
        connection.close().then(() => console.log('Connection closed!'));
    });
};