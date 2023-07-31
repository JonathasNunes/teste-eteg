import { Router } from 'express';
import { ClientController } from '../controller/ClientController';

export const routerClient = Router();
const clientCtrl = new ClientController();

/**
 * Save new client
 */
routerClient.post('/', async (req, res) => {
    const savedClient = await clientCtrl.save(req, res);
    res.json(savedClient);
});

/**
 * Edit client data
 */
routerClient.put('/edit', async (req, res) => {
    const savedClient = await clientCtrl.save(req, res);
    res.json(savedClient);
});

/**
 * Get all clients
 */
routerClient.get('/', async (req, res) => {
    const clients = await clientCtrl.getAll();
    res.json(clients);
});

/**
 * Get client by Id
 */
routerClient.get('/:idClient', async (req, res) => {
    const idClient = parseInt(req.params.idClient);
    const client = await clientCtrl.getById(idClient);
    res.json(client);
});

/**
 * Get client by parameter
 */
routerClient.get('/param/:param/value/:value', async (req, res) => {
    const client = await clientCtrl.getByParam(req.params.param, req.params.value);
    res.json(client);
});

