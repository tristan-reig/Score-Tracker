import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors())
const PORT = 3001;

app.get('/:id/teams', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: `https://api.pandascore.co/leagues/${req.params.id}/tournaments`,
      headers: {
        accept: 'application/json',
        authorization: 'Bearer Cp6oCLvXNKWhRpgG-hl2J9eGviiUpGANvTOLm8_mejbH72Z3zes',
      },
    }
    const response = await axios.request(options);
    res.json({message: response.data});
  } catch (error) {
    console.error('Erreur lors de la requête à l\'API :', error.message);
    res.status(500).json({ error: 'Erreur lors de la requête à l\'API' });
  }
});

app.get('/:id/standings', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: `https://api.pandascore.co/tournaments/${req.params.id}/standings`,
      headers: {
        accept: 'application/json',
        authorization: 'Bearer Cp6oCLvXNKWhRpgG-hl2J9eGviiUpGANvTOLm8_mejbH72Z3zes',
      },
    }
    const response = await axios.request(options);
    res.json({message: response.data});
  } catch (error) {
    console.error('Erreur lors de la requête à l\'API :', error.message);
    res.status(500).json({ error: 'Erreur lors de la requête à l\'API' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
