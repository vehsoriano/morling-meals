import React, { useState } from 'react';
import moment from "moment";
import Calendar from '.././Components/Calendar'

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

  return (
    <div>

     {/* Temporary */}

     <Navbar className="header" expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/balance/">Balance</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/help/">help</NavLink>
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
