import { getManager } from "typeorm";
import { Client } from "../entity/Client";

export class ClientService {

    async save(client: Client) {
        return await getManager().save(client);
    }

    async getAll() {
        return await getManager().find(Client, {
            order: {
                name: "ASC"
            }});
    }

    async getById(id: number) {
        return await getManager().findOne(Client, id);
    }

    async getByParam(param: string, value:string) {

        let par = null;
        if (param == 'cpf') {
            par = {
                cpf: value
            }
        }else {
            par = {
                email: value
            }
        }
        return await getManager().findOne(Client, par);
    }
}