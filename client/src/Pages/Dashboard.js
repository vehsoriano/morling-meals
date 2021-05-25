import React, { useState } from 'react';
import moment from "moment";
import Calendar from '.././Components/Calendar'
import Header from '.././Components/Header'



// Temporary

import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
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
      props.history.push('/login')
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

      <Calendar value={selectedDate} onChange={setSelectedDate} />;
    </div>
  );
}

export default Dashboard;
