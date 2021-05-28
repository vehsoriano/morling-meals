import React, { useState } from 'react';
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom';

import {
    Navbar,
    NavbarBrand,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
  } from 'reactstrap';

function CreateUser({...props}) {
    
    
    const key = localStorage.getItem('token')

    const [value, setValue] = useState({})

    const handleOnchange = (e) => {
        e.persist()
        console.log(e.target.name)
        console.log(e.target.value)

        setValue(prevState =>({
        ...prevState, [e.target.name]: e.target.value
        }))
    }

    const reqParam = {
        first_name: value.first_name,
        last_name: value.last_name,
        email: value.email,
        password: value.password,
        role: value.role
    }


    
    const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
    console.log(reqParam)
    axios
        .post(`http://localhost:5000/api/users/`, reqParam)
        .then(res => {
        console.log(res);
        if(res.data.data.status === "success") {
            alert(res.data.data.msg)
            props.history.push('/admin')
        } else {
            alert(res.data.data.msg)
        }
        })
        .catch(err => {
        console.log(err);
        });
    }

    function signOut(e) {
        e.preventDefault()
        localStorage.removeItem('token')
        props.history.push('/login')
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
        <main className="create-user">

            <Form className="form-holder" onSubmit={handleSubmit}>
                <h2>Create User</h2>
                <FormGroup>
                    <Label for="role">Role</Label>
                    <Input onChange={handleOnchange} type="select" name="role" id="role" required>
                        <option value="" selected disabled>Select user role</option>
                        <option value="student">student</option>
                        <option value="staff">staff</option>
                    </Input>
                </FormGroup>
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
        </main>
      </>
  );
}

export default CreateUser;
