import { ClientBO } from "../bo/ClientBO";

export class ClientController {

    clientBO = new ClientBO();

    async save(req) {
        return await this.clientBO.save(req);
    }

    async getAll() {
        return await this.clientBO.getAll();
    }

    async getById(id: number) {
        return await this.clientBO.getById(id);
    }

    async getByParam(param: string, value:string) {
        return await this.clientBO.getByParam(param, value);
    }
}