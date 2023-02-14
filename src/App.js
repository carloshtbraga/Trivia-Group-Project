import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Login, Game, Config, Feedback, Ranking } from './pages';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/config" component={ Config } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
