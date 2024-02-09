import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 3001;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: 'Bearer Cp6oCLvXNKWhRpgG-hl2J9eGviiUpGANvTOLm8_mejbH72Z3zes',
  },
};

app.get('/', async(req, res) => {
  res.json({message: "Serveur prêt"})
})

app.get('/:leagueId/teams', async (req, res) => {
  options['url'] = `https://api.pandascore.co/leagues/${req.params.leagueId}/tournaments`
  const response = await axios.request(options);
  res.json({message: response.data});
});

app.get('/:tournamentId/standings', async (req, res) => {
  options['url'] = `https://api.pandascore.co/tournaments/${req.params.tournamentId}/standings`
  const response = await axios.request(options);
  res.json({message: response.data});
});

app.get('/:tournamentId/matches', async (req, res) => {
  options['url'] = `https://api.pandascore.co/tournaments/${req.params.tournamentId}/matches?sort=begin_at&page=1&per_page=50`
  const response = await axios.request(options);
  res.json({message: response.data});
});

app.get('/search/:query', async (req, res) => {
  options['url'] = `https://api.pandascore.co/teams/${req.params.query}`
  const response = await axios.request(options);
  res.json({message: response.data});
});

app.get('/search/team/:id', async (req, res) => {
  options['url'] = `https://api.pandascore.co/teams/${req.params.id}/leagues`
  const response = await axios.request(options);
  res.json({message: response.data});
});

app.get('/pastMaches', async (req, res) => {
  try {
    options['url'] = `https://api.pandascore.co/matches/past?filter[opponent_id]=${req.query.id}&page=${req.query.index}&per_page=1`
    const response = await axios.request(options);
    res.json({message: response.data});
  } catch (error) {
    console.log(error)
  }
});

app.get('/:tournamentId/bracket', async (req, res) => {
  try {
    options['url'] = `https://api.pandascore.co/tournaments/10993/brackets`
    const response = await axios.request(options);
    res.json({message: response.data});
  } catch (error) {
    console.log(error)
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});