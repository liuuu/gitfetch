import React, { Component } from 'react';
import '../App.css';

import PopularBar from './PopularBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import Results from './Results';

class App extends Component {
  render() {
    return (



        <BrowserRouter>
          <div className="container">
              <Nav />
              <Switch>
                <Route exact path="/"  component={Home}></Route>
                <Route path="/popular" component={PopularBar}></Route>
                <Route exact path="/battle"  component={Battle}></Route>
                <Route  path="/battle/results"  component={Results}></Route>
                <Route render={function (){
                    return <p>Not Found</p>
                  }}></Route>
              </Switch>
          </div>
        </BrowserRouter>


    );
  }
}

export default App;
