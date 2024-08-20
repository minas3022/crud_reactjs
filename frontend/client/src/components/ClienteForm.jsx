import React, { useState, useEffect } from 'react';

const ClienteForm = ({ onSave, cliente }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  useEffect(() => {
    if (cliente) {
      setFormData(cliente);
    }
  }, [cliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input className="form-control" name="nome" value={formData.nome} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input className="form-control" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Telefone</label>
        <input className="form-control" name="telefone" value={formData.telefone} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-primary">Salvar</button>
    </form>
  );
};

export default ClienteForm;
