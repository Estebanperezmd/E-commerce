const express = require('express');
const axios = require('axios');

const router = express.Router();

// Rutas simples hacia los microservicios
router.get('/pagos', async (req, res) => {
  try {
    const response = await axios.get('https://leda-proalien-kiersten.ngrok-free.dev/pagos');
      const response = await axios.get('https://deep-chairs-melt.loca.lt/pagos');
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/pagos', async (req, res) => {
  try {
    const response = await axios.post('https://leda-proalien-kiersten.ngrok-free.dev/pagos', req.body);
      const response = await axios.post('https://deep-chairs-melt.loca.lt/pagos', req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/usuarios', async (req, res) => {
  try {
    const response = await axios.get('https://leda-proalien-kiersten.ngrok-free.dev/usuarios');
      const response = await axios.get('https://thin-falcons-wonder.loca.lt/usuarios');
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
