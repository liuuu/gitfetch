import React from 'react';
import PropTypes from 'prop-types';
import PlayerView from './PlayerView';

class  Player extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      imgUrl: null,
      player:props.player,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset(){
    this.setState(function(){
      return {
        username:'',
        imgUrl: null
      }
    })
    this.props.handleReset(this.state.player, this.state.username)
  }

  handleChange(e){
    var value = e.target.value;

    this.setState(function(){
      return {
        username: value,
      }
    })
  }

  handleSubmit(e){
    e.preventDefault();
    var imgUrl = `https://github.com/${this.state.username}.png?size=200`;
    this.setState(function(){
      return {
        imgUrl:imgUrl
      }
    });
    this.props.handleSubmit(this.state.player, this.state.username);

  }
  render () {
    console.log('render player');
    if(!this.state.imgUrl){
      return (
        <form className="column" onSubmit={this.handleSubmit} ref={(node) => this.form = node}>
          <label className="header" htmlFor="username">{this.props.player}</label>
          <input id="username"
                placeholder="github name"
                type="text"
                value={this.state.username}
                 onChange={this.handleChange}
                 />
         <button
              type="submit"
              className="btn"
              disabled={!this.state.username}
              >submit</button>
      </form>
      )
    }else {
      // button condition
      return (
        <div className="column">
          <PlayerView username={this.state.username} imgUrl={this.state.imgUrl}>
            <button className="reset" onClick={this.handleReset}>reset</button>
          </PlayerView>
        </div>
      )
    }



  }
}

export default Player;
