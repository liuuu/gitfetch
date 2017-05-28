import React from 'react';
import PropTypes from 'prop-types';
import Player from './Player';
import {Link } from 'react-router-dom';


class Battle extends React.Component {
  constructor(){
    super();
    this.state = {
      playersCount: 0,
      playerOne:'',
      PlayerTwo:'',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

  }

  handleSubmit(id, name){
    console.log('battle handleSubmit');

    this.setState(function(){
      return {
        playersCount: this.state.playersCount + 1,
        [id]:name
      }
    })
  }

  handleReset(id, name){
    this.setState(function(){
      return {
        playersCount: this.state.playersCount - 1,
        [id]:''
      }
    })
  }
  render () {
    console.log('render battle');
    console.log(this.props.match);
    console.log(this.state.playersCount);
    return (
      <div>

        <div className="row">

          <Player handleSubmit={this.handleSubmit} handleReset={this.handleReset} player='playerOne'></Player>
          <Player handleSubmit={this.handleSubmit} handleReset={this.handleReset} player='playerTwo'></Player>

        </div>
        {(this.state.playersCount === 2)&&

        (<Link className="btn"
              to={{pathname: this.props.match.url + '/results',
                   search:'?playerOne=' + this.state.playerOne + '&playerTwo='+ this.state.playerTwo}}>
                   Battle
        </Link>)
      }
    </div>
    )
  }
}

export default Battle;
