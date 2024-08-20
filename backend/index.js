const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Cliente } = require('./models');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Criar um novo cliente
app.post('/clientes', async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todos os clientes ou pesquisar por nome
app.get('/clientes', async (req, res) => {
  try {
    const { nome } = req.query;
    const where = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : {};
    const clientes = await Cliente.findAll({ where });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter um cliente pelo ID
app.get('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: "Cliente não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar um cliente
app.put('/clientes/:id', async (req, res) => {
  try {
    const [updated] = await Cliente.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedCliente = await Cliente.findByPk(req.params.id);
      res.json(updatedCliente);
    } else {
      res.status(404).json({ error: "Cliente não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Excluir um cliente
app.delete('/clientes/:id', async (req, res) => {
  try {
    const deleted = await Cliente.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Cliente não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
