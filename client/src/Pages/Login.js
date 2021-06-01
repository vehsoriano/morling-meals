import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'
import { Redirect, Route, Switch } from 'react-router-dom';

function Login({...props}) {  

  
  const [value, setValue] = useState({})
  const [key, setKey] = useState('')

  useEffect(() => {
    const myKey = localStorage.getItem('token')
    setKey(myKey)
  },[key]);


  const handleOnchange = (e) => {
    e.persist()
    console.log(e.target.value)
    console.log(e.target.name)

    setValue(prevState =>({
      ...prevState, [e.target.name]: e.target.value
    }))
  }

  const reqParam = {
    email: value.email,
    password: value.password,
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('submit')

    if (value.email == 'admin@morling.edu.au' && value.password == 'admin') {
      localStorage.setItem('token', 'admin')
      props.history.push('/admin')
      console.log('admin-login')
    } 
    
    
    if (value.email !== 'admin@morling.edu.au') {
      axios
        .post(`http://localhost:5000/api/auth/`, reqParam)
        .then(res => {
          console.log(res);
          if(res.data.data.status === "success") {
            props.history.push('/dashboard')
            localStorage.setItem('token', 'user')
            localStorage.setItem('user_id', res.data.user._id)
          } else {
            alert(res.data.data.msg)
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  return (
    <main className="login">
      {
        key === "admin" ? <Redirect to="/admin" /> : key === "user" ? <Redirect to="/dashboard" />
        : 
        <Form className="form-holder" onSubmit={handleSubmit}>
          <FormGroup>
              <Label className="label" for="exampleEmail">Email</Label>
              <Input onChange={handleOnchange} type="email" name="email" id="email" placeholder="johndoe@gmail.com" />
          </FormGroup>
          <FormGroup>
              <Label className="label" for="examplePassword">Password</Label>
              <Input onChange={handleOnchange} type="password" name="password" id="examplePassword" placeholder="*******" />
          </FormGroup>     
          <Button className="btn-login">Login</Button>
        </Form>
      }
      </main>
  );
}

export default Login;
