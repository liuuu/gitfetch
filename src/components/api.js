import axios from 'axios';

var id = 'YOUR_CLIENT_ID';
var sec = 'YOUR_SECRECT_ID';
var params = "?client_id=" + id +"&client_secrect=" + sec;

//
function getProfile(username){
  return axios.get(`https://api.github.com/users/${username}${params}`)
            .then(user => user.data)
}

function getRepos(user){
  const url = `https://api.github.com/users/${user}/repos${params}&per_page=100`

  return axios.get(`https://api.github.com/users/${user}/repos${params}&per_page=100`)

}

function getStarCount(repos){

  return repos.data.reduce(function(count, repos){
    return count + repos.stargazers_count;
  }, 0)
}

function calculateScore(profile, repos){
  var followers = parseInt(profile.followers);
  var totalStars = parseInt(getStarCount(repos));


  return (followers * 3) + totalStars;
}

function getUserData(player){
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(data => {
    var profile = data[0];
    var repos = data[1];


    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  })
}

function sortPlayers(players){
  return players.sort(function(a,b){
    return a.score < b.score;
  })
}

function handleError(error){

  return null;
}
export default {
  fetchPopularRepos: function(lang){
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1 + language:' + lang +
          '&sort=stars&order=desc&type=Repositories');
    return axios.get(encodedURI)
              .then(response => response.data.items);
  },

  battle:function(players){


    return axios.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError)
  }
}
