import React, {useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import {
  Navbar,
  NavbarBrand,
  Button,
  Container,
  Row,
  Col
} from 'reactstrap';


function Admin({...props}) {

  function signOut(e) {
    e.preventDefault()
    localStorage.removeItem('token')
    props.history.push('/login')
  }

  const key = localStorage.getItem('token')

  return (
    <>
      {
        key ? (
          <Navbar className="header">
            <Link className="header-brand" to="/admin">Morling Admin Dashboard</Link>
            <Button onClick={signOut} className="button-link">Signout</Button>
          </Navbar>
        ) : (
          <Redirect to="/login" />
        )
      }
      <main className="admin">
        <Container>
          <Row>
            <Col className="box-holder" xs="4">
              <Link to="/users" className="box">
                <p className="box-title">Manage Users</p>
              </Link>
            </Col>
            <Col className="box-holder" xs="4">
              <Link to="/orders" className="box">
                <p className="box-title">Manage Orders</p>
              </Link>
            </Col>
            <Col className="box-holder" xs="4">
              <Link to="menu" className="box">
                <p className="box-title">Manage Calendar Menu</p>
              </Link>
            </Col>
          </Row>
          {/* <Row>
            
            
          </Row> */}
        </Container>
      </main>
    </>
  );
}

export default Admin;
