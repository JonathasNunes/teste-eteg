import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {

  const [clients, setClients] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getClients = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/client");
      setClients(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getClients();
  }, [setClients]);

  return (
    <>
      <Container>
        <Title>Cliente</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getClients={getClients} />
        <Grid setOnEdit={setOnEdit} clients={clients} setClients={setClients}/>
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
      <GlobalStyle />
    </>
  );
}

export default App;
