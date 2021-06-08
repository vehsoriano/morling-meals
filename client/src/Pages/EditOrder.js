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

function EditOrder({...props}) {
    const { match } = props;
    let { orderId } = match.params
    const { date, lunch, dinner, vegetarian } = props.location;
    
    console.log(props)

    const key = localStorage.getItem('token')
    const user_id = localStorage.getItem('user_id')

    const [value, setValue] = useState({})
    const [menu, setMenu] = useState({})

    const handleOnchange = (e) => {
      e.persist()
      console.log(e.target.name)
      console.log(e.target.value)

      setValue(prevState =>({
      ...prevState, [e.target.name]: e.target.value
      }))
    }

    function signOut(e) {
        e.preventDefault()
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        props.history.push('/login')
    }

    useEffect(() => {
      getMenuForThisDate()
      setValue(prevState =>({
        ...prevState, ['lunch']: lunch
        }))
        setValue(prevState =>({
            ...prevState, ['dinner']: dinner
        }))
        setValue(prevState =>({
        ...prevState, ['vegetarian']: vegetarian
        }))
    },[])

    const getMenuForThisDate = () => {
      axios
        .get(`http://localhost:5000/api/menu/${date}`)
        .then(res => {
          console.log(res.data);
          setMenu(res.data)
        })
        .catch(err => {
          console.log(err);
      });
    }

    const updateOrder = (e) => {
        const params = {
            lunch: value.lunch,
            dinner: value.dinner,
            vegetarian: value.vegetarian
        }
        e.preventDefault()
        console.log(value)
        console.log('update order')
        axios
            .put(`http://localhost:5000/api/order/update/${orderId}`, params)
            .then(res => {
            console.log(res.data);
            setMenu(res.data)
            alert('Successfully updated order!')
            props.history.push('/my-orders')
            })
            .catch(err => {
            console.log(err);
        });
    }

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
      <Form className="form-holder" onSubmit={updateOrder}>
            <h2>Order for date: {moment(date).format('LL')}</h2>
            <FormGroup>
                <Label className="label" for="lunch">Lunch</Label>
                <Input onChange={handleOnchange} type="select" name="lunch" id="lunch">
                    <option className="hide" disabled selected value="">{value.lunch}</option>
                    <option value={menu.lunch}>{menu.lunch}</option>
                    <option value={menu.lunch_option_two}>{menu.lunch_option_two}</option>
                </Input>
            </FormGroup>                
            <FormGroup>
                <Label className="label" for="dinner">Dinner</Label>
                <Input onChange={handleOnchange} type="select" name="dinner" id="dinner">
                    <option className="hide" disabled selected value="">{value.dinner}</option>
                    <option value={menu.dinner}>{menu.dinner}</option>
                    <option value={menu.dinner_option_two}>{menu.dinner_option_two}</option>
                </Input>
            </FormGroup> 
            <FormGroup>
                <Label className="label" for="vegetarian">Vegetarian</Label>
                <Input onChange={handleOnchange} type="select" name="vegetarian" id="vegetarian">
                    <option className="hide" disabled selected value="">{value.vegetarian}</option>
                    <option value={menu.vegetarian}>{menu.vegetarian}</option>
                </Input>
            </FormGroup> 
            <Button className="btn-login">Update Order</Button>
        </Form>
      </>
  );
}

export default EditOrder;
