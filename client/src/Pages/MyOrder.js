import React, {useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Button
  } from 'reactstrap';
  
import moment from 'moment'

function MyOrders({...props}) {

    const [loading, setLoading] = useState(false)
    const [myOrders, setMyOrders] = useState([])
    const [user, setUser] = useState({})
    const user_id = localStorage.getItem('user_id')

    // Temporary

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);


    // Temporary
    
    useEffect(() => {
        getOrders()
        getUserData()
    }, [])

    function signOut(e) {
        e.preventDefault()
        localStorage.removeItem('token')
        props.history.push('/login')
    }

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

    function getOrders() {
        axios
        .get(`http://localhost:5000/api/order/userorder/${user_id}`)
        .then(res => {
            setMyOrders(res.data);
            setLoading(true);
        })
        .catch(err => {
        console.log(err);
        });
    }
    const key = localStorage.getItem('token')

    console.log(myOrders.myOrder)

    const editOrder = (id, lunch, dinner, vegetarian, date) => {
        console.log('Edit Order')
        console.log(lunch, dinner, vegetarian)
        props.history.push({
            pathname: `/my-order/update/${id}`,
            lunch: lunch,
            dinner: dinner, 
            vegetarian: vegetarian,
            date: date
        })
    }

    const deleteOrder = (id) => {
        var deleteOrder = window.confirm("Are you sure you want to delete this order?");
        if (deleteOrder == true) {
        axios
            .delete(`http://localhost:5000/api/order/delete/${id}`)
            .then(res => {
            console.log(res);
            alert('Order has been successfully deleted')
            window.location.reload();
            })
            .catch(err => {
            console.log(err);
            });
        }
    }

    

    

  return (
    <>
      {
        key ? (
            <Navbar className="header" expand="md">
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink disabled href="/"><strong>Hi, {user.first_name}</strong></NavLink>
                    </NavItem>
                    <li>
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
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
        ) : (
          <Redirect to="/login" />
        )
      }
      { loading ? (
          <main className="admin">
          <section className="table">
            <div className="container">
              <h1 className="title">My Orders</h1>
              <div className="holder-btn-create">
                {/* <Button color="secondary" onClick={() => props.history.push('/users/add/')}>Create User</Button> */}
              </div>
              <div className="tbl-header">
                <table cellPadding="0" cellSpacing="0" border="0">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Lunch</th>
                      <th>Dinner</th>
                      <th>Vegetarian</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="tbl-content">
  
            </div>
              <table cellPadding="0" cellSpacing="0" border="0">
                <tbody>
                  {
                    myOrders.myOrder.map((orders,i) => {
                      return (
                        <tr key={i}>
                            <td className="capitalize">{moment(orders.date).format('LL')}</td>
                            <td className="capitalize">{orders.lunch}</td>
                            <td className="capitalize">{orders.dinner}</td>
                            <td className="capitalize">{orders.vegetarian}</td>
                            <td>
                                <Button 
                                    color="secondary" 
                                    onClick={() => editOrder(orders._id, orders.lunch, orders.dinner, orders.vegetarian, orders.date)}
                                    disabled={moment().isAfter(orders.date) ? true : false}
                                    >Edit
                                </Button> 
                                
                                <span>   </span>
                                <Button 
                                    color="danger" 
                                    onClick={() => deleteOrder(orders._id)}
                                    disabled={moment().isAfter(orders.date) ? true : false}
                                    >Delete 
                                </Button>
                            </td>
                        </tr>
                      )
                    })
                  }             
                </tbody>
              </table>
            </div>
          </section>
        </main>
      ) : (
          <div>Populating data...</div>
      )}
      
    </>
  );
}

export default MyOrders;
