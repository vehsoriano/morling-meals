import React, {useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Navbar,
  NavbarBrand,
  Button,
} from 'reactstrap';

function Users({...props}) {

  const [user, setUser] = useState([])

  
  useEffect(() => {
    getUsers()
  }, [user])

  function signOut(e) {
    e.preventDefault()
    localStorage.removeItem('token')
    props.history.push('/login')
  }

  function getUsers() {
    axios
    .get('http://localhost:5000/api/users/')
    .then(res => {
      setUser(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  const key = localStorage.getItem('token')

  const editDetails = (id) => {
    console.log(id)
    props.history.push(`/users/update/${id}`)
  }

  const deleteDetails = (id) => {
    var deleteUser = window.confirm("Are you sure you want to delete this user?");
    if (deleteUser == true) {
      axios
        .delete(`http://localhost:5000/api/users/delete/${id}`)
        .then(res => {
          console.log(res);
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
          <Navbar className="header">
            <Link className="header-brand" to="/admin">Morling Admin Dashboard</Link>
            <Button onClick={signOut} className="button-link">Signout</Button>
          </Navbar>
        ) : (
          <Redirect to="/login" />
        )
      }
      <main className="admin">
        <section className="table">
          <div className="container">
            <h1 className="title">Morling Staffs and Students</h1>
            <div className="holder-btn-create">
              <Button color="secondary" onClick={() => props.history.push('/users/add/')}>Create User</Button>
            </div>
            <div className="tbl-header">
              <table cellPadding="0" cellSpacing="0" border="0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
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
                  user.map((item,i) => {
                    return (
                      <tr key={i}>
                        <td className="capitalize">{item.first_name + " " + item.last_name}</td>
                        <td className="capitalize">{item.role}</td>
                        <td>
                          <Button color="secondary" onClick={() => editDetails(item._id)}>Edit</Button> <span>   </span>
                          <Button color="secondary" onClick={() => deleteDetails(item._id)}>Delete</Button>
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
    </>
  );
}

export default Users;
