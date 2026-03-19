import 'dotenv/config';
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { parse } from 'node-html-parser';
import he from 'he';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'backend en ligne' });
});

const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const optionsPanda = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: `Bearer ${process.env.PANDASCORE_API_KEY}`,
  },
};

// Rugby Routes

app.get('/rugby/:compName-cup/teams', asyncHandler(async (req, res) => {
  const [resp, teamTab] = [{}, []]
  const response = await axios.get(`https://www.epcrugby.com/fr/${req.params.compName}-cup/clubs`)
  const root = parse(response.data)
  root.querySelectorAll(".gap-x-4").map(team => {
    teamTab.push(resp[team.querySelector('img').attributes.alt] = team.querySelector('img').attributes.src)
  })
  res.json(resp)
}))

app.get('/rugby/:compName-cup/groups', asyncHandler(async (req, res) => {
  const [resp] = [{}]
  var [groupTab, teamTab] = [[], []]
  const response = await axios.get(`https://www.epcrugby.com/fr/${req.params.compName}-cup/matchs/poules`)
  const root = parse(response.data)
  root.querySelectorAll('[name="flip-list"]').map((group, index) => {
    group.querySelectorAll('tr').map(team => {
      team.querySelectorAll('td').map((row, index) => {
        [2, 4, 5, 7, 12].includes(index) && teamTab.push(row.innerText)
      })
      teamTab.push(team.querySelector('img')._attrs.src)
      groupTab.push(teamTab)
      teamTab = []
    })
    resp[`Groupe ${['A', 'B', 'C', 'D'][index]}`] = groupTab
    groupTab = []
  })
  res.json(resp)
}))

app.get('/rugby/:compName-cup/matches', asyncHandler(async (req, res) => {
  const [resp, homeTab, awayTab, infosTab] = [{}, [], [], []]
  const response = await axios.get('https://www.epcrugby.com/fr/challenge-cup/matchs')
  const root = parse(response.data)
  resp["home"] = homeTab
  resp["away"] = awayTab
  resp["infos"] = infosTab
  res.json(resp)
}))

app.get('/rugby/:leagueName/teams', asyncHandler(async (req, res) => {
  const [resp, teamTab] = [{}, []]
  const response = await axios.get(`https://${req.params.leagueName}.lnr.fr/clubs`)
  const root = parse(response.data)
  root.querySelectorAll(".club-card__logo-img").map(team => {
    teamTab.push(resp[team.attributes.alt] = team.attributes.src)
  })
  res.json(resp)
}))

app.get('/rugby/:leagueName/standings', asyncHandler(async (req, res) => {
  var [resp, teamTab] = [{}, []]
  const response = await axios.get(`https://${req.params.leagueName}.lnr.fr/classement`)
  const root = parse(response.data)
  const response2 = await axios.get(`https://www.epcrugby.com/fr/challenge-cup/clubs`)
  const root2 = parse(response2.data)
  root.querySelectorAll(".table-line__cell-image").map((team) => {
    teamTab.push(resp[team.attributes.alt] = team.attributes.src)
  })
  teamTab = []
  root.querySelectorAll(".table-line--ranking-scrollable").map((team, index) => {
    for (let i = 3; i <= 13; i += 2) {
      teamTab.push(team.childNodes[i].innerText.trim())
    }
    root2.querySelectorAll('.tile').map(cupTeam => {
      var cupTeamName = cupTeam.childNodes[1].childNodes[1].childNodes[0].rawText
      var compTeamName = team.childNodes[1].innerText.trim()
      if (cupTeamName == compTeamName || cupTeamName.includes(compTeamName) || compTeamName.includes(cupTeamName) || compTeamName.replace(/[^A-Z]/g, '') === cupTeamName) {
        teamTab.push("Challenge Cup")
      }
    })
    if (!teamTab[6]) teamTab.push('Champions cup')
    resp[team.childNodes[1].innerText.trim()] = [root.querySelectorAll('.table-line__cell-image')[index].attributes.src].concat(teamTab)
    teamTab = []
  })
  res.json(resp)
}))

app.get('/rugby/:leagueName/matches', asyncHandler(async (req, res) => {
  const [resp, matchDict, homeTab, awayTab, infosTab] = [{}, {}, [], [], []]
  const response = await axios.get(`https://${req.params.leagueName}.lnr.fr/calendrier-et-resultats/${req.query.week ? `2023-2024/j${req.query.week}` : ``}`)
  const root = parse(response.data)
  var currentDay = root.querySelector(".calendar-results__fixture-date").innerHTML.trim()
  root.querySelectorAll(".club-line").map((club, index) => {
    index % 2 === 0 ?
    homeTab.push([club.querySelector('.club-line__name').innerHTML.trim(), club.childNodes[1].childNodes[1]._attrs.src]) :
    awayTab.push([club.querySelector('.club-line__name').innerHTML.trim(), club.childNodes[1].childNodes[1]._attrs.src])
  })
  root.querySelectorAll(".calendar-results__line").map((match, index) => {
    var matchDay = match.previousElementSibling.childNodes[0].rawText.trim()
    if (matchDay.includes("vendredi") || matchDay.includes("samedi") || matchDay.includes("dimanche")) {
      currentDay = matchDay
    }
    try {
      infosTab.push([currentDay, match.querySelector('.match-line__score').innerHTML.trim(), match.querySelector('.match-links__link').attributes.href.split('/')[6]])
    } catch {
      infosTab.push([currentDay, match.querySelector('.match-line__time').innerHTML.trim()])
    }
  })
  matchDict["home"] = homeTab
  matchDict["away"] = awayTab
  matchDict["infos"] = infosTab
  resp[root.querySelector(".calendar-results__title").innerHTML.trim().split(' ')[1]] = matchDict
  res.json(resp)
}))

app.get('/rugby/:leagueName/details', asyncHandler(async (req, res) => {
  const [resp, playerTab] = [{}, []];
  const response = await axios.get(`https://${req.params.leagueName}.lnr.fr/feuille-de-match/2023-2024/j${req.query.week}/${req.query.id}/compositions`)
  const root = parse(response.data);
  root.querySelectorAll('.player-pitch__name').map(player => playerTab.push(he.decode(player.childNodes[0].innerText + ' ' + player.childNodes[1].innerText)))
  resp["players"] = playerTab
  resp["home"] = [req.query.id.split('-')[1], root.querySelectorAll('.player-pitch__jersey')[0].attributes.src]
  resp["away"] = [req.query.id.split('-')[2], root.querySelectorAll('.player-pitch__jersey')[15].attributes.src]
  res.json(resp);
}))

// Football Routes

app.get('/football/ligue1/teams', asyncHandler(async (req, res) => {
  const response = await axios.get(
    'https://api.football-data.org/v4/competitions/FL1/teams',
    { headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY } }
  );
  const resp = {};
  response.data.teams.forEach(team => {
    resp[team.shortName] = team.crest;
  });
  res.json(resp);
}))

app.get('/football/ligue1/standings', asyncHandler(async (req, res) => {
  const response = await axios.get(
    'https://api.football-data.org/v4/competitions/FL1/standings',
    { headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY } }
  );
  const resp = {};
  response.data.standings[0].table.forEach(entry => {
    resp[entry.team.shortName] = [
      entry.team.crest,
      entry.points,
      entry.playedGames,
      entry.won,
      entry.draw,
      entry.lost,
    ];
  });
  res.json(resp);
}))

app.get('/football/ligue1/matches', asyncHandler(async (req, res) => {
  const matchday = req.query.week ?? '';
  const url = matchday
    ? `https://api.football-data.org/v4/competitions/FL1/matches?matchday=${matchday}`
    : `https://api.football-data.org/v4/competitions/FL1/matches?status=SCHEDULED,LIVE,FINISHED&limit=10`;
  const response = await axios.get(url, {
    headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY }
  });
  const homeTab = [], awayTab = [], infosTab = [];
  response.data.matches.forEach(match => {
    homeTab.push([match.homeTeam.shortName, match.homeTeam.crest]);
    awayTab.push([match.awayTeam.shortName, match.awayTeam.crest]);
    const score = match.status === 'FINISHED'
      ? `${match.score.fullTime.home}-${match.score.fullTime.away}`
      : match.utcDate.slice(11, 16);
    infosTab.push([match.utcDate.slice(0, 10), score]);
  });
  const week = response.data.matches[0]?.season?.currentMatchday ?? matchday;
  res.json({ [week]: { home: homeTab, away: awayTab, infos: infosTab } });
}))
```

N'oublie pas d'ajouter la variable dans Railway → service backend → **Variables** :
```
FOOTBALL_API_KEY=b8828dfa98de4fe9a95b33c2c39d3339

app.get('/football/premier-league/teams', asyncHandler(async (req, res) => {
  const resp = {};
  const response = await axios.get("https://www.premierleague.com/clubs");
  const root = parse(response.data);
  root.querySelectorAll(".club-card-wrapper").map(container => {
    resp[container.querySelector('.club-card__name').innerText] = container.querySelector('.club-card__badge').childNodes[1].childNodes[1].attributes.src;
  })
  res.json(resp);
}))

app.get('/football/euro2024/teams', asyncHandler(async (req, res) => {
  const resp = {};
  const response = await axios.get("https://fr.uefa.com/euro2024/teams/");
  const root = parse(response.data);
  root.querySelector(".teams-overview_group").querySelectorAll('.team').map(team => {
    var name = he.decode(team.innerText.trim());
    resp[name] = `../src/assets/euro/${name}.png`;
  })
  res.json(resp);
}))

// League Routes

app.get('/league/:leagueId/teams', asyncHandler(async (req, res) => {
  optionsPanda['url'] = `https://api.pandascore.co/leagues/${req.params.leagueId}/tournaments`
  const response = await axios.request(optionsPanda);
  res.json(response.data);
}))

app.get('/league/:tournamentId/standings', asyncHandler(async (req, res) => {
  optionsPanda['url'] = `https://api.pandascore.co/tournaments/${req.params.tournamentId}/standings`
  const response = await axios.request(optionsPanda);
  res.json(response.data);
}))

app.get('/league/:tournamentId/matches', asyncHandler(async (req, res) => {
  optionsPanda['url'] = `https://api.pandascore.co/tournaments/${req.params.tournamentId}/matches?sort=begin_at&page=1&per_page=100`
  const response = await axios.request(optionsPanda);
  res.json(response.data);
}))

app.get('/league/:leagueName/:season/details', asyncHandler(async (req, res) => {
  const [resp, pickTab, banTab] = [{}, [], []];
  const matchNum = parseInt((req.query.day - 1) * 5) + parseInt(req.query.match);
  const week = Math.ceil(req.query.day / 2);
  const response = await axios.get(`https://lol.fandom.com/wiki/${req.params.leagueName}/2024_Season/${req.params.season}_Season/Scoreboards${week === 1 ? "" : `/Week_${week}`}`);
  const root = parse(response.data);
  const container = root.querySelectorAll('.inline-content')[(matchNum - 1) % 10];
  container.querySelectorAll('.champion-sprite').map((champion, index) => {
    var champion = champion.attributes.title;
    index - 10 < 0 ? pickTab.push(champion) : banTab.push(champion);
  })
  resp["time"] = container.querySelector(`tr.sb-w${req.query.day % 2 != 0 ? 1 : 2}-g${matchNum % 10 == 0 ? 10 : matchNum % 10}`).childNodes[1].innerText;
  resp["players"] = container.querySelectorAll('.sb-p-name').map(player => player.innerText);
  resp["kda"] = container.querySelectorAll('.sb-p-stat-kda').map(kda => kda.innerText);
  resp["gold"] = container.querySelectorAll('.sb-header-Gold').map(gold => gold.innerText.trim());
  resp["towers"] = container.querySelectorAll('.sb-footer-item-towers').map(tower => tower.innerText.trim());
  resp["dragons"] = container.querySelectorAll('.sb-footer-item-dragons').map(dragon => dragon.innerText.trim());
  resp["barons"] = container.querySelectorAll('.sb-footer-item-barons').map(baron => baron.innerText.trim());
  resp["pick"] = pickTab;
  resp["ban"] = banTab;
  res.json(resp);
}))

app.get('/search/:query', asyncHandler(async (req, res) => {
  optionsPanda['url'] = `https://api.pandascore.co/teams/${req.params.query}`
  const response = await axios.request(optionsPanda);
  res.json({ message: response.data });
}))

app.get('/search/team/:id', asyncHandler(async (req, res) => {
  optionsPanda['url'] = `https://api.pandascore.co/teams/${req.params.id}/leagues`
  const response = await axios.request(optionsPanda);
  res.json({ message: response.data });
}))

app.get('/pastMaches', asyncHandler(async (req, res) => {
  optionsPanda['url'] = `https://api.pandascore.co/matches/past?filter[opponent_id]=${req.query.id}&page=${req.query.index}&per_page=1`
  const response = await axios.request(optionsPanda);
  res.json({ message: response.data });
}))

app.get('/league/:tournamentId/bracket', asyncHandler(async (req, res) => {
  optionsPanda['url'] = `https://api.pandascore.co/tournaments/${req.params.tournamentId}/brackets`
  const response = await axios.request(optionsPanda);
  res.json(response.data);
}))

app.use((err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path} →`, err.message);
  res.status(err.response?.status ?? 500).json({ error: err.message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});