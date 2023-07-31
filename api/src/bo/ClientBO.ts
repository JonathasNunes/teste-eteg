import { Client } from "../entity/Client";
import { ClientService } from "../service/ClientService";
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ClientValidation } from "../validation/ClientValidation";
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

export class ClientBO {

    clientService = new ClientService();

    async save(req, res) {
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
          return res.status(400).json({ error: 'CPF inválido ' });
        }
      
        let msg = 'Cliente cadastrado com sucesso!';
        try {
          // Check if cpf and email already exist in Db
          if (typeof id !== 'undefined') {
            client.id = parseInt(id);
            msg = 'Cliente editado com sucesso!';
          } else {
            const cpfExists = await this.isCpfInUse(cpf);
            if (cpfExists) {
              return res.status(400).json({ error: 'Cliente já existe. CPF já cadastrado ' });
            }
      
            const emailExists = await this.isEmailInUse(email);
            if (emailExists) {
              return res.status(400).json({ error: 'Cliente já existe. Email já cadastrado ' });
            }
          }
          await this.clientService.save(client);
          return res.status(201).json({ message: msg, client });
        } catch (error) {
          // Handle specific errors if needed, or rethrow the error for the calling code to handle.
          return res.status(400).json({ error: 'Erro ao cadastrar cliente: ' + error.message });
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