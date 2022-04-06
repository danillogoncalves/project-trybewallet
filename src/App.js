import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      <Switch>
        <Route component={ Wallet } path="/carteira" />
        <Route exact component={ Login } path="/" />
      </Switch>
    </div>
  );
}

export default App;
