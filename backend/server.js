import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

const optionsPanda = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: 'Bearer Cp6oCLvXNKWhRpgG-hl2J9eGviiUpGANvTOLm8_mejbH72Z3zes',
  },
};

const optionsRugby = {
  method: 'GET',
  params : {
    season : '2023',
  },
  headers: {
    "X-RapidAPI-Key": "0d6af37ed6mshe1e1da9a44bf621p1d5813jsn3f193721113d",
    "X-RapidAPI-Host": "api-rugby.p.rapidapi.com"
  }
};

// Rugby Routes

app.get('/rugby/:LeagueId/teams', async(req, res) => {
  optionsRugby['params']['league'] = req.params.LeagueId;
  optionsRugby['url'] = "https://api-rugby.p.rapidapi.com/teams"
  const response = await axios.request(optionsRugby)
  res.json({message: response.data.response})
})

app.get('/rugby/:LeagueId/standings', async(req, res) => {
  optionsRugby['url'] = "https://api-rugby.p.rapidapi.com/standings"
  const response = await axios.request(optionsRugby)
  res.json({message: response.data.response[0]})
})

app.get('/rugby/:LeagueId/matches', async(req, res) => {
  res.json({message: "test"})
})

// League Routes

app.get('/league/:leagueId/teams', async (req, res) => {
  optionsPanda['url'] = `https://api.pandascore.co/leagues/${req.params.leagueId}/tournaments`
  const response = await axios.request(optionsPanda);
  res.json({message: response.data});
});

app.get('/league/:tournamentId/standings', async (req, res) => {
  optionsPanda['url'] = `https://api.pandascore.co/tournaments/${req.params.tournamentId}/standings`
  const response = await axios.request(optionsPanda);
  res.json({message: response.data});
});

app.get('/league/:tournamentId/matches', async (req, res) => {
  optionsPanda['url'] = `https://api.pandascore.co/tournaments/${req.params.tournamentId}/matches?sort=begin_at&page=1&per_page=50`
  const response = await axios.request(optionsPanda);
  res.json({message: response.data});
});

app.get('/search/:query', async (req, res) => {
  optionsPanda['url'] = `https://api.pandascore.co/teams/${req.params.query}`
  const response = await axios.request(optionsPanda);
  res.json({message: response.data});
});

app.get('/search/team/:id', async (req, res) => {
  optionsPanda['url'] = `https://api.pandascore.co/teams/${req.params.id}/leagues`
  const response = await axios.request(optionsPanda);
  res.json({message: response.data});
});

app.get('/pastMaches', async (req, res) => {
  try {
    optionsPanda['url'] = `https://api.pandascore.co/matches/past?filter[opponent_id]=${req.query.id}&page=${req.query.index}&per_page=1`
    const response = await axios.request(optionsPanda);
    res.json({message: response.data});
  } catch (error) {
    console.log(error)
  }
});

app.get('/league/:tournamentId/bracket', async (req, res) => {
  try {
    optionsPanda['url'] = `https://api.pandascore.co/tournaments/10993/brackets`
    const response = await axios.request(optionsPanda);
    res.json({message: response.data});
  } catch (error) {
    console.log(error)
  }
});

app.listen(3001, () => {
  console.log(`Serveur démarré`);
});