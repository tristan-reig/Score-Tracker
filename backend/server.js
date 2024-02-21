import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { parse } from 'node-html-parser';

const app = express();
app.use(cors());

const optionsPanda = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: 'Bearer Cp6oCLvXNKWhRpgG-hl2J9eGviiUpGANvTOLm8_mejbH72Z3zes',
  },
};

// Rugby Routes

app.get('/rugby/teams', async(req, res) => {
  const [resp, teamTab] = [{}, []]
  const response = await axios.get(`https://top14.lnr.fr/clubs`)
  const root = parse(response.data)
  root.querySelectorAll(".club-card__logo-img").map((team) => {
    teamTab.push(resp[team.attributes.alt] = team.attributes.src)
  })
  res.json(resp)
})

app.get('/rugby/standings', async(req, res) => {
  var [resp, teamTab] = [{}, []]
  const response = await axios.get(`https://top14.lnr.fr/classement`)
  const root = parse(response.data)
  root.querySelectorAll(".table-line__cell-image").map((team) => {
    teamTab.push(resp[team.attributes.alt] = team.attributes.src)
  })
  teamTab = []
  root.querySelectorAll(".table-line--ranking-scrollable").map((team, index) => {
    for (let i = 3; i <= 13; i += 2) {
      teamTab.push(team.childNodes[i].innerText.trim())
    }
    resp[team.childNodes[1].innerText.trim()] = [root.querySelectorAll('.table-line__cell-image')[index].attributes.src].concat(teamTab)
    teamTab = []
  })
  res.json(resp)
})

app.get('/rugby/bstandings', async(req, res) => {
  const [resp] = [{}]
  const response = await axios.get(`https://www.allrugby.com/competitions/top-14/classement-britannique.html`)
  const root = parse(response.data)
  root.querySelectorAll('tbody')[0].querySelectorAll('tr').map((team, index) => {
    team.childNodes.length > 2 && (resp[team.childNodes[3].innerText.trim()] = 1)
  })
  console.log(root.querySelectorAll('img')[2].attributes.src)
  res.json(resp)
})

app.get('/rugby/matches', async(req, res) => {
  const [resp, matchDict, homeTab, awayTab, infosTab] = [{}, {}, [], [], []]
  const response = await axios.get(`https://top14.lnr.fr/calendrier-et-resultats/${req.query.week && `2023-2024/j${req.query.week}`}`)
  const root = parse(response.data)
  var currentDay = root.querySelector(".calendar-results__fixture-date").innerHTML.trim()
  root.querySelectorAll(".club-line").map((club, index) => index % 2 === 0 ? 
  homeTab.push([club.childNodes[3].childNodes[0].innerText.trim(), club.childNodes[1].childNodes[1]._attrs.src]) : 
  awayTab.push([club.childNodes[3].childNodes[0].innerText.trim(), club.childNodes[1].childNodes[1]._attrs.src]))
  root.querySelectorAll(".calendar-results__line").map((match, index) => {
    match.previousElementSibling.childNodes[0].rawText.trim().includes("samedi") || match.previousElementSibling.childNodes[0].rawText.trim().includes("dimanche") &&
    (currentDay = match.previousElementSibling.childNodes[0].rawText.trim())
    infosTab.push([currentDay, root.querySelectorAll(".match-line__score")[index].innerHTML.trim()])
  })
  matchDict["home"] = homeTab
  matchDict["away"] = awayTab
  matchDict["infos"] = infosTab
  resp[root.querySelector(".calendar-results__title").innerHTML.trim().split(' ')[1]] = matchDict
  res.json(resp)
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