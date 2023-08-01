import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask";
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
  const [cpfValue, setCpfValue] = useState("");

  useEffect(() => {
    if (onEdit) {
      const client = ref.current;

      client.name.value = onEdit.name;
      client.email.value = onEdit.email;
      client.cpf.value = onEdit.cpf;
      client.obs.value = onEdit.obs;
      setInitialColor(onEdit.favorite_color);
      setCpfValue(onEdit.cpf);
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let clean = true;
    const client = ref.current;

    if (!client.name.value || !client.email.value || !client.cpf.value) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      try {
        const { data } = await axios.put("http://localhost:4000/api/client/edit", {
          id: onEdit.id,
          name: client.name.value,
          email: client.email.value,
          cpf: client.cpf.value.replace(/\D/g, ""), // Remove a máscara do CPF antes de enviar
          favorite_color: client.favorite_color.value,
          obs: client.obs.value,
        });
        toast.success(data.message);
      } catch (error) {
        clean = false;
        toast.error(error.response.data.error);
      }
    } else {
      try {
        const { data } = await axios.post("http://localhost:4000/api/client", {
          name: client.name.value,
          email: client.email.value,
          cpf: client.cpf.value.replace(/\D/g, ""), // Remove a máscara do CPF antes de enviar
          favorite_color: client.favorite_color.value,
          obs: client.obs.value,
        });
        toast.success(data.message);
      } catch (error) {
        clean = false;
        toast.error(error.response.data.error);
      }
    }

    if (clean) {
      setCpfValue("");
      client.name.value = "";
      client.email.value = "";
      client.obs.value = "";
      client.favorite_color.value = "#ffffff";
      setInitialColor("#ffffff");

      setOnEdit(null);
      getClients();
    }
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
                <InputMask
                  mask="999.999.999-99"
                  name="cpf"
                  value={cpfValue} // Use cpfValue aqui
                  onChange={(e) => setCpfValue(e.target.value)} // Atualiza o estado cpfValue quando o campo for alterado
                  style={{
                    width: "95%",
                    padding: "0 10px",
                    border: "1px solid #bbb",
                    borderRadius: "5px",
                    height: "40px",
                  }}
                />
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
