import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ColorPicker from "./ColorPicker";
import styled from 'styled-components';
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputAreaColor = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

const Input = styled.input`
  width: 95%;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getClients, onEdit, setOnEdit }) => {
    const ref = useRef();
    const [initialColor, setInitialColor] = useState("#ffffff"); // Initial Color

    useEffect(() => {
        if (onEdit) {
          const client = ref.current;
    
          client.name.value = onEdit.name;
          client.email.value = onEdit.email;
          client.cpf.value = onEdit.cpf;
          client.obs.value = onEdit.obs;
          setInitialColor(onEdit.favorite_color); 
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const client = ref.current;
    
        if (
          !client.name.value ||
          !client.email.value ||
          !client.cpf.value 
        ) {
          return toast.warn("Preencha todos os campos!");
        }
    
        if (onEdit) {
          await axios
            .put("http://localhost:4000/api/client/edit" + onEdit.id, {
              name: client.name.value,
              email: client.email.value,
              cpf: client.cpf.value,
              favorite_color: client.favorite_color.value,
              obs: client.obs.value
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        } else {
          await axios
            .post("http://localhost:4000/api/client", {
              name: client.name.value,
              email: client.email.value,
              cpf: client.cpf.value,
              favorite_color: client.favorite_color.value,
              obs: client.obs.value
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        }
    
        client.name.value = "";
        client.email.value = "";
        client.cpf.value = "";
        client.obs.value = "";
        client.favorite_color.value = "#ffffff";
        setInitialColor("#ffffff");
    
        setOnEdit(null);
        getClients();
      };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="name" />
            </InputArea>
            <InputArea>
                <Label>E-mail</Label>
                <Input name="email" type="email" />
            </InputArea>
            <InputArea>
                <Label>CPF</Label>
                <Input name="cpf" />
            </InputArea>
            <InputArea>
                <Label>Observações</Label>
                <Input name="obs" type="text" />
            </InputArea>
            <InputAreaColor>
                <Label>Cor Favorita</Label>
                <ColorPicker initialColor={initialColor} />
            </InputAreaColor>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;
