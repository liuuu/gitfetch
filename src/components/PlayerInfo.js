import React from 'react';
import PropTypes from 'prop-types';
import PlayerView from './PlayerView';
import {Link } from 'react-router-dom';

class PlayerInfo extends React.Component {
  render () {



    var info = this.props.info.profile;

    return (
      <div className="colomn">
        <h1 className="header">{this.props.label}</h1>
        <h3 style={{textAlign:'center'}}>Score: {this.props.info.score}</h3>
        <PlayerView imgUrl={info.avatar_url} username={info.login}>
          <ul className="space-list-item">
            {info.name&&<li>{info.name}</li>}
            {info.location&&<li>{info.location}</li>}
            {info.company&&<li>{info.company}</li>}
            {info.followers&&<li>Followers: {info.followers}</li>}
            {info.blog&&<li>blog: <a href={info.blog}>blog</a></li>}

          </ul>
         </PlayerView>
      </div>
    )
  }
}

export default PlayerInfo;
