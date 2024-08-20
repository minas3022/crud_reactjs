import React, { useState } from 'react';

const ClienteSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Pesquisar por nome"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="btn btn-primary mt-2">Pesquisar</button>
    </form>
  );
};

export default ClienteSearch;
