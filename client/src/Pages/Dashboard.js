import React, { useState, useEffect } from 'react';
import moment from "moment";
import Calendar from '.././Components/Calendar'
import axios from 'axios'
import { Link } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';

// Temporary

function Dashboard({...props}) {
    const [selectedDate, setSelectedDate] = useState(moment());
    const [user, setUser] = useState({})
    const user_id = localStorage.getItem('user_id')

    // Temporary

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

  
    // Temporary

    function signOut(e) {
      e.preventDefault()
      localStorage.removeItem('token')
      localStorage.removeItem('user_id')
      props.history.push('/login')
    }

    function goToAdd(date) {
      props.history.push(`/users/order/${date}`)
      // props.history.push('/login')
    }

    useEffect(() => {
      getUserData()
    },[])

    function getUserData() {
      axios
        .get(`http://localhost:5000/api/users/${user_id}`)
        .then(res => {
          console.log(res.data)
            setUser(res.data)
        })
        .catch(err => {
        console.log(err);
      });
    }

  return (
    <div>

     {/* Temporary */}

     <Navbar className="header" expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink disabled href="/"><strong>Hi, {user.first_name}</strong></NavLink>
            </NavItem>
            <li>
              <Link className="nav-link" to="/my-orders">My Orders</Link>
            </li>
            <NavItem>
              <NavLink href="/balance">Balance</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/help">Help</NavLink>
            </NavItem>
            
          </Nav>
        </Collapse>
        <Button onClick={signOut} className="button-link">Signout</Button>
      </Navbar>

    {/* Temporary */}

      <Calendar value={selectedDate} onChange={setSelectedDate} goToAdd={goToAdd}/>;
    </div>
  );
}

export default Dashboard;
