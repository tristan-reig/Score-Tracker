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

app.get('/rugby/:compName-cup/teams', async(req, res) => {
  const [resp, teamTab] = [{}, []]
  const response = await axios.get(`https://www.epcrugby.com/fr/${req.params.compName}-cup/clubs`)
  const root = parse(response.data)
  root.querySelectorAll(".gap-x-4").map(team => {
    teamTab.push(resp[team.querySelector('img').attributes.alt] = team.querySelector('img').attributes.src)
  })
  res.json(resp)
})

app.get('/rugby/:compName-cup/groups', async(req, res) => {
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
})

app.get('/rugby/:compName-cup/matches', async(req, res) => {
  const [resp, homeTab, awayTab, infosTab] = [{}, [], [], []]
  const response = await axios.get('https://www.epcrugby.com/fr/challenge-cup/matchs')
  const root = parse(response.data)
  resp["home"] = homeTab
  resp["away"] = awayTab
  resp["infos"] = infosTab
  res.json(resp)
})

app.get('/rugby/:leagueName/teams', async(req, res) => {
  const [resp, teamTab] = [{}, []]
  const response = await axios.get(`https://${req.params.leagueName}.lnr.fr/clubs`)
  const root = parse(response.data)
  root.querySelectorAll(".club-card__logo-img").map(team => {
    teamTab.push(resp[team.attributes.alt] = team.attributes.src)
  })
  res.json(resp)
})

app.get('/rugby/:leagueName/standings', async(req, res) => {
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
      var compTeamName =  team.childNodes[1].innerText.trim()
      if (cupTeamName == compTeamName || cupTeamName.includes(compTeamName) || compTeamName.includes(cupTeamName) || compTeamName.replace(/[^A-Z]/g, '') === cupTeamName) {
        teamTab.push("Challenge Cup")
      }
    })
    if (!teamTab[6]) teamTab.push('Champions cup')
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

app.get('/football/ligue1/teams', async (req, res) => {
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

app.get('/football/ligue1/standings', async (req, res) => {
  const resp = {}
  var teamTab = []
  const response = await axios.get('https://www.ligue1.fr/classement')
  const root = parse(response.data)
  root.querySelectorAll('.GeneralStats-row').map(team => {
    teamTab.push(`https://www.ligue1.fr${team.querySelector('img').attributes['data-src']}`)
    team.querySelectorAll('.GeneralStats-item').map((row, index) => {
      [2, 3, 4, 5, 6].includes(index) && teamTab.push(row.innerText)
    })
    resp[he.decode(team.querySelector('.GeneralStats-item--club').childNodes[3].innerHTML)] = teamTab
    teamTab = []
  })
  res.json(resp)
})

app.get('/football/ligue1/matches', async (req, res) => {
  const [resp, matchDict, homeTab, awayTab, infosTab] = [{}, {}, [], [], []]
  const response = await axios.get(req.query.week ? `https://www.ligue1.fr/calendrier-resultats?matchDay=${req.query.week}` : `https://www.ligue1.fr/calendrier-resultats`)
  const root = parse(response.data)
  var currentDay = root.querySelector('.calendar-widget-day').innerText
  root.querySelectorAll('.calendarTeamNameDesktop').map((team, index) => {
    index % 2 === 0 ? homeTab.push([he.decode(team.innerText.trim()), `https://www.ligue1.fr${team.previousElementSibling.attributes.src}`.replace('mh=60&mw=60', 'mh=100&mw=100')]) : 
    awayTab.push([he.decode(team.innerText.trim()), `https://www.ligue1.fr${team.previousElementSibling.attributes.src}`.replace('mh=60&mw=60', 'mh=100&mw=100')])
  })
  root.querySelectorAll('.match-result').map(match => {
    var day = match.parentNode.previousElementSibling.innerHTML
    var info = match.querySelector('.Calendar-clubResult').innerText.trim()
    currentDay === day ? infosTab.push([he.decode(currentDay.split(' ').slice(0, -1).join(' ')), info]) : 
    infosTab.push([he.decode(currentDay.split(' ').slice(0, -1).join(' ')), info])
    currentDay = day
  })
  matchDict["home"] = homeTab
  matchDict["away"] = awayTab
  matchDict["infos"] = infosTab
  resp[root.querySelector('.Scorebar-journeyItem--active').innerText.trim().slice(1)] = matchDict
  res.json(resp)
})

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

app.get('/valorant/:leagueId/groups', async (req, res) => {
  const resp = {};
  const letters = ['A', 'B', 'C'];
  optionsPanda['url'] = `https://api.pandascore.co/series/${req.params.leagueId}`
  const response = await axios.request(optionsPanda);
  for (const letter of letters) {
    const tournamentId = response.data.tournaments.find(tournament => tournament.name.includes(letter)).id;
    optionsPanda['url'] = `https://api.pandascore.co/tournaments/${tournamentId}/standings`
    const standingsResponse = await axios.request(optionsPanda);
    const teams = standingsResponse.data.map(team => team);
    resp["Groupe " + letter] = teams;
  }
  res.json(resp);
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

app.get('/league/:leagueName/:season/details', async (req, res) => {
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
  resp["time"] = container.querySelector(`tr.sb-w${req.query.day % 2 != 0 ? 1 : 2}-g${matchNum % 10}`).childNodes[1].innerText;
  resp["players"] = container.querySelectorAll('.sb-p-name').map(player => player.innerText);
  resp["kda"] = container.querySelectorAll('.sb-p-stat-kda').map(kda => kda.innerText);
  resp["gold"] = container.querySelectorAll('.sb-header-Gold').map(gold => gold.innerText.trim());
  resp["towers"] = container.querySelectorAll('.sb-footer-item-towers').map(tower => tower.innerText.trim());
  resp["dragons"] = container.querySelectorAll('.sb-footer-item-dragons').map(dragon => dragon.innerText.trim());
  resp["barons"] = container.querySelectorAll('.sb-footer-item-barons').map(baron => baron.innerText.trim());
  resp["pick"] = pickTab;
  resp["ban"] = banTab;
  res.json(resp);
})

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
  optionsPanda['url'] = `https://api.pandascore.co/tournaments/${req.params.tournamentId}/brackets`
  const response = await axios.request(optionsPanda);
  res.json(response.data);
});

app.listen(3001, () => {
  console.log(`Serveur démarré`);
});