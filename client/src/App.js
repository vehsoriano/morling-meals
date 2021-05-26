import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Home from './Pages/Home'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import AdminDashboard from './Pages/AdminDashboard'
import SingleUser from './Pages/SIngleUser'


import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;


function App() {
  return (
    <HashRouter basename='/'>
      <React.Suspense fallback={loading()}>
        
        <Switch>
          <Route exact path="/" name="Home Page" render={props => <Home {...props}/>} />
          <Route exact path="/login" name="Login" render={props => <Login {...props}/>} />
          <Route exact path="/dashboard" name="Dashboard" render={props => <Dashboard {...props}/>} />
          <Route exact path="/admin" name="Admin" render={props => <AdminDashboard {...props}/>} />
          <Route exact path="/users/update/:userId" name="SingleUser" render={props => <SingleUser {...props}/>} />
        </Switch>

      </React.Suspense>
  </HashRouter>
  );
}

export default App;
