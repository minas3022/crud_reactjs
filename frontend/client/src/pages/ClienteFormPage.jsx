import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClienteForm from '../components/ClienteForm';

const ClienteFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchCliente = async () => {
        const response = await axios.get(`http://localhost:3001/clientes/${id}`);
        setCliente(response.data);
      };
      fetchCliente();
    }
  }, [id]);

  const handleSave = async (formData) => {
    if (id) {
      await axios.put(`http://localhost:3001/clientes/${id}`, formData);
    } else {
      await axios.post('http://localhost:3001/clientes', formData);
    }
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Editar Cliente' : 'Novo Cliente'}</h2>
      <ClienteForm onSave={handleSave} cliente={cliente} />
    </div>
  );
};

export default ClienteFormPage;
