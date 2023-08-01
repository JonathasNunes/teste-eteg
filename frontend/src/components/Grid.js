import React from "react";
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
  font-size: 14px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
  font-size: 12px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ clients, setClients, setOnEdit }) => {

    const customBackgroundColor = (color) => {
        // Se a cor fornecida tiver 3 dígitos, expanda-a para 6 dígitos (por exemplo, #000 => #000000)
        if (color.length === 4) {
          const [_, r, g, b] = color;
          color = "#" + r + r + g + g + b + b;
        }
        // Se a cor tiver 6 dígitos (ou seja, estiver no formato #RRGGBB), use-a diretamente
        // Caso contrário, retorne null para não definir o background-color
        return /^#([A-Fa-f0-9]{6})$/.test(color) ? color : null;
    };

    const handleEdit = (item) => {
        setOnEdit(item);
    };

    return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th onlyWeb>Email</Th>
          <Th >CPF</Th>
          <Th >Cor Favorita</Th>
          <Th onlyWeb>Observações</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {clients.map((item, i) => {
            return (
            <Tr key={i}>
                <Td width="20%">{item.name}</Td>
                <Td width="22%" onlyWeb>{item.email}</Td>
                <Td width="12%">{item.cpf}</Td>
                <Td alignCenter style={{ backgroundColor:customBackgroundColor(item.favorite_color) }} width="15%"></Td>
                <Td width="20%" onlyWeb>{item.obs}</Td>
                <Td alignCenter width="5%">
                <FaEdit onClick={() => handleEdit(item)} />
                </Td>
            </Tr>
            );
        })}
        </Tbody>
    </Table>
  );
};

export default Grid;