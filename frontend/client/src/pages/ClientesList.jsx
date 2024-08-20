import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchClientes = async () => {
      const response = await axios.get(`http://localhost:3001/clientes?nome=${search}`);
      setClientes(response.data);
    };
    fetchClientes();
  }, [search]);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/clientes/${id}`);
    setClientes(clientes.filter(cliente => cliente.id !== id));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // O estado `search` já está sendo monitorado pelo useEffect para buscar os dados
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Clientes</h2>
      <form onSubmit={handleSearch} className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Pesquisar por nome"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Pesquisar</button>
      </form>
      <Link to="/novo" className="btn btn-success mb-3">Novo Cliente</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
              <td>
                <Link to={`/editar/${cliente.id}`} className="btn btn-primary me-2">Editar</Link>
                <button onClick={() => handleDelete(cliente.id)} className="btn btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientesList;
