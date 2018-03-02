import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "./style/reset.css";
import Common from "./components/Common";
import Home from "./components/Home";
import Detail from "./components/Detail";
import List from "./components/List";
import Cinema from "./components/Cinema";
import CinemaInfo from "./components/CinemaInfo";
import FilmList from "./components/FilmList";

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Common />
        <Route exact path="/" component={Home} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/list" component={List} />
        <Route path="/cinema" component={Cinema} />
        <Route path="/cinemainfo/:id" component={CinemaInfo} />
        <Route path="/filmlist/:id" component={FilmList} />
      </div>
      </Router>
    );
  }
}

export default App;
