const express = require('express');
const axios = require('axios');

const router = express.Router();

// Rutas simples hacia los microservicios
router.get('/pagos', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3001/pagos');
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/pagos', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3001/pagos', req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/usuarios', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3002/usuarios');
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
