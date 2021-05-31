import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Home from './Pages/Home'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import AdminDashboard from './Pages/AdminDashboard'
import Users from './Pages/Users'
import UpdateUser from './Pages/UpdateUser'
import CreateUser from './Pages/CreateUser'
import CreateMenu from './Pages/CreateMenu'
import AddMenu from './Pages/AddMenu'


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
          <Route exact path="/users" name="Users" render={props => <Users {...props}/>} />
          <Route exact path="/users/update/:userId" name="UpdateUser" render={props => <UpdateUser {...props}/>} />
          <Route exact path="/users/add/" name="CreateUser" render={props => <CreateUser {...props}/>} />
          <Route exact path="/menu" name="CreateMenu" render={props => <CreateMenu {...props}/>} />
          <Route exact path="/menu/add/:date" name="AddMenu" render={props => <AddMenu {...props}/>} />
        </Switch>

      </React.Suspense>
  </HashRouter>
  );
}

export default App;
