import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px',
  }
};

class Loading extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text:props.text
    }
  }

  componentDidMount() {
    console.log('loading this ', this );
    var stoper = this.props.text + '...';
    this.interval = setInterval(function () {
      if(this.state.text === stoper){
        this.setState(function(){
          return {
            text: this.props.text
          };
        })
      }else {
        this.setState(function(prevState){
          return {
            text: prevState.text + '.'
          }
        })
      }
    }.bind(this), this.props.speed);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render () {

    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed:PropTypes.number.isRequired,
}

Loading.defaultProps = {
  text: 'loading',
  speed: 100,
}

export default Loading;
