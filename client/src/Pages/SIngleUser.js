import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom"; 

import {
  Navbar,
  NavbarBrand,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

function SingleUser({...props}) {
    const { match } = props;
    let { userId } = match.params

    const [user, setUser] = useState({})

    useEffect(() => {
      axios.get(`http://localhost:5000/api/users/${userId}`)
      .then(({ data: user }) => {
        setUser(user)
      });
    }, [])

    function signOut(e) {
      e.preventDefault()
      localStorage.removeItem('token')
      props.history.push('/login')
    }

    console.log(user)

    const handleOnchange = (e) => {
      e.persist()
      console.log(e.target.value)
      console.log(e.target.name)

      setUser(prevState =>({
        ...prevState, [e.target.name]: e.target.value
      }))
    }

    const reqParam = {
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role
    }

    const handleUpdate = (e) => {
      e.preventDefault()
      console.log('submit')
      console.log(reqParam)
      axios
        .put(`http://localhost:5000/api/users/update/${userId}`, reqParam)
        .then(res => {
          console.log(res);
          if(res.data.data.status === "success") {
            alert(res.data.data.msg)
          } else {
            alert(res.data.data.msg)
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

  return (
    <>
      <Navbar className="header">
            <Link className="header-brand" to="/admin">Morling Admin Dashboard</Link>
          <Button onClick={signOut} className="button-link">Signout</Button>
        </Navbar>
      <main className="single-user">
          <div className="holder-form">
            <Form className="form-holder" onSubmit={handleUpdate}>
              <FormGroup>
                  <Label className="label" for="first_name">First Name</Label>
                  <Input onChange={handleOnchange} value={user.first_name} type="text" name="first_name" id="first_name" placeholder="John" />
              </FormGroup>
              <FormGroup>
                  <Label className="label" for="last_name">Last Name</Label>
                  <Input onChange={handleOnchange} value={user.last_name} type="text" name="last_name" id="last_name" placeholder="Doe" />
              </FormGroup>
              <FormGroup>
                    <Label for="role">Role</Label>
                    <Input onChange={handleOnchange} type="select" value={user.role} name="role" id="role">
                        <option value="student">student</option>
                        <option value="staff">staff</option>
                    </Input>
                </FormGroup>
              <FormGroup>
                  <Label className="label" for="email">Email</Label>
                  <Input disabled onChange={handleOnchange} value={user.email} type="email" name="email" id="email" placeholder="johndoe@gmail.com" />
              </FormGroup>
              {/* <FormGroup>
                  <Label className="label" for="password">Change Password</Label>
                  <Input onChange={handleOnchange} type="text" name="password" id="password" placeholder="*******" />
              </FormGroup>      */}
              <Button type="submit" className="btn-login">Update</Button>
            </Form>
          </div>
      </main>
    </>
  );
}

export default SingleUser;
