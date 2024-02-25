import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { parse } from 'node-html-parser';
import he from 'he';

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

app.get('/rugby/:leagueName/teams', async(req, res) => {
  const [resp, teamTab] = [{}, []]
  const response = await axios.get(`https://${req.params.leagueName}.lnr.fr/clubs`)
  const root = parse(response.data)
  root.querySelectorAll(".club-card__logo-img").map((team) => {
    teamTab.push(resp[team.attributes.alt] = team.attributes.src)
  })
  res.json(resp)
})

app.get('/rugby/:leagueName/standings', async(req, res) => {
  var [resp, teamTab] = [{}, []]
  const response = await axios.get(`https://${req.params.leagueName}.lnr.fr/classement`)
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

app.get('/rugby/:leagueName/matches', async(req, res) => {
  const [resp, matchDict, homeTab, awayTab, infosTab] = [{}, {}, [], [], []]
  const response = await axios.get(`https://${req.params.leagueName}.lnr.fr/calendrier-et-resultats/${req.query.week ? `2023-2024/j${req.query.week}` : ``}`)
  const root = parse(response.data)
  var currentDay = root.querySelector(".calendar-results__fixture-date").innerHTML.trim()
  root.querySelectorAll(".club-line").map(async (club, index) => {
    index % 2 === 0 ?
    homeTab.push([club.childNodes[3].childNodes[0].innerText.trim(), club.childNodes[1].childNodes[1]._attrs.src]) :
    awayTab.push([club.childNodes[3].childNodes[0].innerText.trim(), club.childNodes[1].childNodes[1]._attrs.src])
  })
  root.querySelectorAll(".calendar-results__line").map(async (match, index) => {
    var matchDay = match.previousElementSibling.childNodes[0].rawText.trim()
    if (matchDay.includes("vendredi") || matchDay.includes("samedi") || matchDay.includes("dimanche")) {
      currentDay = matchDay
    }
    try {
      infosTab.push([currentDay, root.querySelectorAll('.match-line__score')[index].innerHTML.trim()])
    } catch {
      infosTab.push([currentDay, root.querySelectorAll('.match-line__time')[index - root.querySelectorAll('.match-line__score').length].innerHTML.trim()])
    }
  })
  matchDict["home"] = homeTab
  matchDict["away"] = awayTab
  matchDict["infos"] = infosTab
  resp[root.querySelector(".calendar-results__title").innerHTML.trim().split(' ')[1]] = matchDict
  res.json(resp)
})

// Football Routes

app.get('/football/teams', async (req, res) => {
  const resp = {};
  const response = await axios.get(`https://www.ligue1.fr/clubs/liste`);
  const root = parse(response.data);
  const cardTitles = root.querySelectorAll('.card-title');
  const clubLogos = root.querySelectorAll('.ClubListPage-logo');

  cardTitles.forEach((cardTitle, index) => {
    const name = he.decode(cardTitle.innerHTML.trim());
    const formattedName = name.toLowerCase().replace(/(^|\s)\S/g, (match) => match.toUpperCase());
    const logoSrc = clubLogos[index].childNodes[1].attributes['data-src'];
    const logoUrl = logoSrc ? "https://ligue1.fr" + logoSrc : null;
    resp[formattedName] = logoUrl;
  });

  res.json(resp);
});

// Valorant Routes

app.get('/valorant/:leagueId/teams', async (req, res) => {
  const teamTab = []
  optionsPanda['url'] = `https://api.pandascore.co/series/${req.params.leagueId}`
  const response = await axios.request(optionsPanda);
  for (let i = 0; i < 3 ; i++) {
    optionsPanda['url'] = `https://api.pandascore.co/tournaments/${response.data.tournaments[i].id}/teams`
    const res = await axios.request(optionsPanda)
    res.data.map(team => teamTab.push(team))
  }
  res.json(teamTab)
});

// League Routes

app.get('/league/:leagueId/teams', async (req, res) => {
  optionsPanda['url'] = `https://api.pandascore.co/leagues/${req.params.leagueId}/tournaments`
  const response = await axios.request(optionsPanda);
  res.json(response.data);
});

app.get('/league/:tournamentId/standings', async (req, res) => {
  optionsPanda['url'] = `https://api.pandascore.co/tournaments/${req.params.tournamentId}/standings`
  const response = await axios.request(optionsPanda);
  res.json(response.data);
});

app.get('/league/:tournamentId/matches', async (req, res) => {
  optionsPanda['url'] = `https://api.pandascore.co/tournaments/${req.params.tournamentId}/matches?sort=begin_at&page=1&per_page=100`
  const response = await axios.request(optionsPanda);
  res.json(response.data);
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
  optionsPanda['url'] = `https://api.pandascore.co/matches/past?filter[opponent_id]=${req.query.id}&page=${req.query.index}&per_page=1`
  const response = await axios.request(optionsPanda);
  res.json({message: response.data});
});

app.get('/league/:tournamentId/bracket', async (req, res) => {
  optionsPanda['url'] = `https://api.pandascore.co/tournaments/10993/brackets`
  const response = await axios.request(optionsPanda);
  res.json({message: response.data});
});

app.listen(3001, () => {
  console.log(`Serveur démarré`);
});