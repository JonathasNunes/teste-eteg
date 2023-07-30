import { app } from './app';

const PORT = 4000;

const server =
    app.listen(PORT, () => console.log(`App - Listen to ${PORT}`));

/**
 * When terminating the process, the app is terminated as well.
 */
process.on('SIGINT', () => {
    server.close();
    console.log('App closed');
});