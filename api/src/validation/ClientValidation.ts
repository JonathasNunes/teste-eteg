import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class ClientValidation{ 

    @IsString()
    @IsNotEmpty()
    @Length(3, 150)
    name: string; 
  
    @IsString()
    @IsNotEmpty()
    @Length(11, 14)
    cpf: string; 
    
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Length(5, 150)
    email: string;
    
    @IsString()
    @IsNotEmpty()
    favorite_color: string;
 }