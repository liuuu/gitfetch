import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import api from './api';
import { Link } from 'react-router-dom';
import Player from './Player';
import PlayerInfo from './PlayerInfo';
import Loading from './Loading';

class Results extends React.Component {
  constructor(){
    super();
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount(){
    var players = queryString.parse(this.props.location.search);
    console.log('didmount',players);
    api.battle([
      players.playerOne,
      players.playerTwo
    ]).then(results => {
      if(!results){
        return this.setState(function(){
          return {
            error: 'Looks like there was an error, check that users',
            loading: false
          }
        })
      }else{
        this.setState(function(){
          return {
            error: null,
            winner: results[0],
            loser:results[1],
            loading: false
          }
        })
      }
    })
  }
  render () {
    var error = this.state.error;
    var loading = this.state.loading;
    if(loading){
      return <Loading></Loading>
    }else if(error){
      return (<div>
                {error}
                <Link to='/battle'>Reset</Link>
            </div>)
    }else{

      return (
        <div>
          <div className="row">
             <PlayerInfo label='winner' info={this.state.winner}></PlayerInfo>
             <PlayerInfo label='loser' info={this.state.loser}></PlayerInfo>
          </div>
          <div className="row">
            <Link className="btn" to='/battle'>Back to battle</Link>
          </div>
        </div>
      )
    }

  }
}

export default Results;
