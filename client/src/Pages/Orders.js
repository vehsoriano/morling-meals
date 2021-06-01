import React, {useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Navbar,
  NavbarBrand,
  Button,
} from 'reactstrap';
import moment from 'moment'

function Orders({...props}) {

const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])

  
  useEffect(() => {
    getOrders()
  }, [])

  function signOut(e) {
    e.preventDefault()
    localStorage.removeItem('token')
    props.history.push('/login')
  }

  function getOrders() {
    axios
    .get('http://localhost:5000/api/order/')
    .then(res => {
        setOrders(res.data);
        setLoading(true);
    })
    .catch(err => {
      console.log(err);
    });
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
      { loading ? (
          <main className="admin">
          <section className="table">
            <div className="container">
              <h1 className="title">Morling Staffs and Students Orders</h1>
              <div className="holder-btn-create">
                {/* <Button color="secondary" onClick={() => props.history.push('/users/add/')}>Create User</Button> */}
              </div>
              <div className="tbl-header">
                <table cellPadding="0" cellSpacing="0" border="0">
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Lunch</th>
                      <th>Dinner</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="tbl-content">
  
            </div>
              <table cellPadding="0" cellSpacing="0" border="0">
                <tbody>
                  {
                    orders.map((item,i) => {
                      return (
                        <tr key={i}>
                            <td className="capitalize">{item.user_first_name + " " + item.user_last_name}</td>
                            <td className="">{item.user_email}</td>
                            <td className="capitalize">{item.user_role}</td>
                            <td className="capitalize">{item.order_lunch}</td>
                            <td className="capitalize">{item.order_dinner}</td>
                            <td className="capitalize">{moment(item.order_date).format('LL')}</td>
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

export default Orders;
