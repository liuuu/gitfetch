import React from 'react';
import PropTypes from 'prop-types';
import api from './api';
import Loading from './Loading';



const SelectList = (props) => {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'Css', 'Python'];
  return  (
    <ul className="languages">
      {languages.map(function(lang){
        return <li key={lang}
                   onClick={() => props.onSelect(lang)}
                   style={lang === props.selectedLanguage? {color: '#d0021b'} : null}>
                   {lang}
                </li>
      }, this)}
    </ul>
  )
}



class PopularBar extends React.Component {
  constructor(){
    super();
    this.state = {
      selectedLanguage: 'All',
      repos: null,
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    console.log('didmount');
    api.fetchPopularRepos(this.state.selectedLanguage)
      .then(repos => {
        this.setState({
          repos:repos
        })
      });
  }

  updateLanguage(lang){
    this.setState(function(){
      return {
        selectedLanguage: lang,
        repos: null,
      }
    });
    api.fetchPopularRepos(lang)
      .then(repos => {
        this.setState({
          repos: repos,
        })
      })
  }
  render () {

    return (
      <div>
        <SelectList
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
          />
        <RepoGrid repos={this.state.repos} />
      </div>
    )
  }
}

const RepoGrid = (props) => {
  if(!props.repos){
    return <Loading text='Loadinging'></Loading>
  }

  return (
    <ul className="popular-list">
      {props.repos.map(function(repo, index){
        return (
          <li key={index} className="popular-item">
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-item">
              <li>
               <img className="avatar" src={repo.owner.avatar_url} alt={repo.owner.login}/>
              </li>
              <li><a href="{repo.html_url}">{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count}</li>
            </ul>
          </li>
          )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array,
}
export default PopularBar;
