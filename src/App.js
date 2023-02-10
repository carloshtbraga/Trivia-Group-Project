import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Login, Game, Config } from './pages';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/config" component={ Config } />
      </Switch>
    </div>
  );
}
