import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientesList from './pages/ClientesList';
import ClienteFormPage from './pages/ClienteFormPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientesList />} />
        <Route path="/novo" element={<ClienteFormPage />} />
        <Route path="/editar/:id" element={<ClienteFormPage />} />
      </Routes>
    </Router>
  );
};

export default App;
