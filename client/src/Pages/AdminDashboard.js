import React, {useEffect, useState } from 'react';
import { Redirect, } from 'react-router-dom';
import axios from 'axios';
import {
  Navbar,
  NavbarBrand,
  Button,
} from 'reactstrap';

function Admin({...props}) {

  const [user, setUser] = useState([])

  
  useEffect(() => {
    getUsers()
  }, [])

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

  return (
    <>
      {
        key ? (
          <Navbar className="header">
            <NavbarBrand href="/admin">Morling Admin Dashboard</NavbarBrand>
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
            <div className="tbl-header">
              <table cellpadding="0" cellspacing="0" border="0">
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
            <table cellpadding="0" cellSpacing="0" border="0">
              <tbody>
                {
                  user.map((item,i) => {
                    return (
                      <tr key={i}>
                        <td>{item.first_name + " " + item.last_name}</td>
                        <td>{item.role}</td>
                      <td><Button color="secondary" onClick={() => editDetails(item._id)}>Edit</Button></td>
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

export default Admin;

// 

// const [value, setValue] = useState({})

//   const handleOnchange = (e) => {
//     e.persist()
//     console.log(e.target.value)
//     console.log(e.target.name)

//     setValue(prevState =>({
//       ...prevState, [e.target.name]: e.target.value
//     }))
//   }


// const reqParam = {
//   first_name: value.first_name,
//   last_name: value.last_name,
//   email: value.email,
//   password: value.password
// }

// const handleSubmit = (e) => {
//   e.preventDefault()
//   console.log('submit')
//   axios
//     .post(`http://localhost:5000/api/users/`, reqParam)
//     .then(res => {
//       console.log(res);
//       if(res.data.data.status === "success") {
//         alert(res.data.data.msg)
//       } else {
//         alert(res.data.data.msg)
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   }

// const [activeTab, setActiveTab] = useState('1');

//   const toggle = tab => {
//     if(activeTab !== tab) setActiveTab(tab);
//   }

{/* <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => { toggle('1'); }}
                >
                  Create User
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => { toggle('2'); }}
                >
                  Add Menu
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Form className="form-holder" onSubmit={handleSubmit}>
                  <FormGroup>
                      <Label className="label" for="first_name">First Name</Label>
                      <Input onChange={handleOnchange} type="text" name="first_name" id="first_name" placeholder="John" />
                  </FormGroup>
                  <FormGroup>
                      <Label className="label" for="last_name">Last Name</Label>
                      <Input onChange={handleOnchange} type="text" name="last_name" id="last_name" placeholder="Doe" />
                  </FormGroup>
                  <FormGroup>
                      <Label className="label" for="email">Email</Label>
                      <Input onChange={handleOnchange} type="email" name="email" id="email" placeholder="johndoe@gmail.com" />
                  </FormGroup>
                  <FormGroup>
                      <Label className="label" for="password">Password</Label>
                      <Input onChange={handleOnchange} type="password" name="password" id="password" placeholder="*******" />
                  </FormGroup>     
                  <Button className="btn-login">Register</Button>
                </Form>
              </TabPane>
              <TabPane tabId="2">
                
              </TabPane>
            </TabContent>
          </div> */}