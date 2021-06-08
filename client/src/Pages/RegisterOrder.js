import React, { useState, useEffect } from 'react';
import axios from 'axios'
import moment from "moment";
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

function RegisterOrder({...props}) {
    const { match } = props;
    let { date } = match.params
    
    console.log(date)

    const key = localStorage.getItem('token')
    const user_id = localStorage.getItem('user_id')

    const [value, setValue] = useState({})
    const [menu, setMenu] = useState({})
    const [loading, setLoading] = useState(false)

    const handleOnchange = (e) => {
      e.persist()
      console.log(e.target.name)
      console.log(e.target.value)

      setValue(prevState =>({
      ...prevState, [e.target.name]: e.target.value
      }))
    }

    

    const addOrder = (e) => {
    e.preventDefault()

      if (value.lunch == undefined && value.dinner == undefined && value.vegetarian == undefined) {
        alert('Please fill atleast one')
      } else {
        const reqParam = {
          date: date,
          lunch: value.lunch || "",
          dinner: value.dinner || "",
          vegetarian: value.vegetarian || "",
        }
        console.log('submit')
        console.log(reqParam)
          axios
              .post(`http://localhost:5000/api/order/${user_id}`, reqParam)
              .then(res => {
              console.log(res);
              if(res.data.data.status === "success") {
                  alert(res.data.data.msg)
                  props.history.push('/dashboard')
              } else {
                  alert(res.data.data.msg)
              }
              })
              .catch(err => {
              console.log(err);
          });
      }
    }

    function signOut(e) {
        e.preventDefault()
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        props.history.push('/login')
    }

    useEffect(() => {
      getMenuForThisDate()
    },[])

    const getMenuForThisDate = () => {
      axios
        .get(`http://localhost:5000/api/menu/${date}`)
        .then(res => {
          console.log(res.data);
          setMenu(res.data)
          setLoading(true)
        })
        .catch(err => {
          console.log(err);
      });
    }

    console.log(menu)

  return (
      <>
      {
        key ? (
          <Navbar className="header">
            <Link className="header-brand" to="/dashboard">Dashboard</Link>
            <Button onClick={signOut} className="button-link">Signout</Button>
          </Navbar>
        ) : (
          <Redirect to="/login" />
        )
      }
      {
        loading ? (
          <main className="create-user">
          {
            menu !== null ? (
              <Form className="form-holder" onSubmit={addOrder}>
                <h2>Order for date: {moment(date).format('LL')}</h2>
                <FormGroup>
                    <Label className="label" for="lunch">Lunch</Label>
                    <Input onChange={handleOnchange} type="select" name="lunch" id="lunch" placeholder="Carbonara Penne">
                        <option disabled selected value=" ">Please select lunch option</option>
                        <option value={menu.lunch}>{menu.lunch}</option>
                        <option value={menu.lunch_option_two}>{menu.lunch_option_two}</option>
                    </Input>
                </FormGroup>                
                <FormGroup>
                    <Label className="label" for="dinner">Dinner</Label>
                    <Input onChange={handleOnchange} type="select" name="dinner" id="dinner" placeholder="Beef Steak with rice">
                        <option disabled selected value=" ">Please select dinner option</option>
                        <option value={menu.dinner}>{menu.dinner}</option>
                        <option value={menu.dinner_option_two}>{menu.dinner_option_two}</option>
                    </Input>
                </FormGroup> 
                <FormGroup>
                    <Label className="label" for="vegetarian">Vegetarian</Label>
                    <Input onChange={handleOnchange} type="select" name="vegetarian" id="vegetarian" placeholder="Resotto">
                        <option disabled selected value=" ">Please select vegetarian option</option>
                        <option value={menu.vegetarian}>{menu.vegetarian}</option>
                    </Input>
                </FormGroup> 
                <Button className="btn-login">Order</Button>
            </Form>
            ) : (
              <div className="solo-div">
                <h2>Date: {moment(date).format('LL')}</h2>
                <br />
                <p>There is no menu created for this day yet. </p>
                <p>Kindly wait for the advisory for the updated menu for this day!</p>
                <p>Go back to the <Link to="/dashboard">Dashboard</Link></p>
              </div>
            )
          }
            
        </main>
        ) : <p>Loading..</p>
      }
      </>
  );
}

export default RegisterOrder;
