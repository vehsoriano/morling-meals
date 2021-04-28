import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './Components/Dashboard'
import AdminDashboard from './Components/AdminDashboard'
import Home from './Components/Home'

import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;


function App() {
  return (
    <HashRouter basename='/'>
      <React.Suspense fallback={loading()}>
        
        <Switch>
          <Route exact path="/" name="Home Page" render={props => <Home {...props}/>} />
          <Route exact path="/dashboard" name="Home Page" render={props => <Dashboard {...props}/>} />
          <Route exact path="/admin" name="Home Page" render={props => <AdminDashboard {...props}/>} />
        </Switch>

      </React.Suspense>
  </HashRouter>
  );
}

export default App;
