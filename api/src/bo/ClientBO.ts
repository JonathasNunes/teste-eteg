import { Client } from "../entity/Client";
import { ClientService } from "../service/ClientService";
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ClientValidation } from "../validation/ClientValidation";
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

export class ClientBO {

    clientService = new ClientService();

    async save(req) {

        //convert req.body plain object to Structure Class and validate
        let clientStructureClass = plainToClass(ClientValidation , req.body); 
        let errors = await validate(clientStructureClass);
        if(errors.length > 0) {
            let erVet = [];
            for (let i in errors) {
                erVet.push(errors[i].constraints);
            }
            let error = {
                error: erVet
            }
            return error;
        } 

        const { name, cpf, email, favorite_color, id } = req.body;
        const client = new Client(name, cpf, email, favorite_color);

        //Validate cpf
        if (!cpfValidator.isValid(cpf)) {
            throw Error('Cpf not valid!');
        }

        //Check if cpf and email already exists in Db
        if (typeof id !== "undefined") {
            client.id = parseInt(id);
        }else {
            const cpfExists = await this.isCpfInUse(cpf);
            if (cpfExists) {
                throw Error('Cpf already exists!');
            }

            const emailExists = await this.isEmailInUse(email);
            if (emailExists) {
                throw Error('Email already exists!');
            }
        }

        return await this.clientService.save(client);
    }

    async getAll() {
        return await this.clientService.getAll();
    }

    async getById(id: number) {
        return await this.clientService.getById(id);
    }

    async getByParam(param: string, value:string) {
        return await this.clientService.getByParam(param, value);
    }

    async isCpfInUse(cpf){
        return await this.getByParam('cpf', cpf);
    }

    async isEmailInUse(email){
        return await this.getByParam('email', email); 
    }
}