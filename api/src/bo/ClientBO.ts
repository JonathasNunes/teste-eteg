import { Client } from "../entity/Client";
import { ClientService } from "../service/ClientService";
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ClientValidation } from "../validation/ClientValidation";
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

export class ClientBO {

    clientService = new ClientService();

    async save(req) {
        // Convert req.body plain object to Structure Class and validate
        const clientStructureClass = plainToClass(ClientValidation, req.body);
        const errors = await validate(clientStructureClass);
        
        if (errors.length > 0) {
          const errorMessages = errors.map(error => error.constraints);
          return { error: errorMessages };
        }
      
        const { name, cpf, email, favorite_color, obs, id } = req.body;
        const client = new Client(name, cpf, email, favorite_color, obs);
      
        // Validate cpf
        if (!cpfValidator.isValid(cpf)) {
          throw new Error('Cpf not valid!');
        }
      
        try {
          // Check if cpf and email already exist in Db
          if (typeof id !== 'undefined') {
            client.id = parseInt(id);
          } else {
            const cpfExists = await this.isCpfInUse(cpf);
            if (cpfExists) {
              throw new Error('Cpf already exists!');
            }
      
            const emailExists = await this.isEmailInUse(email);
            if (emailExists) {
              throw new Error('Email already exists!');
            }
          }
      
          return await this.clientService.save(client);
        } catch (error) {
          // Handle specific errors if needed, or rethrow the error for the calling code to handle.
          throw error;
        }
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