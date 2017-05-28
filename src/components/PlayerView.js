import React from 'react';
import PropTypes from 'prop-types';

class PlayerView extends React.Component {
  render () {
    return (
      <div>
        <img className="avatar" src={this.props.imgUrl} alt=""/>
        <h1 className="username">@{this.props.username}</h1>
        {this.props.children}
      </div>
    )
  }
}

export default PlayerView;
