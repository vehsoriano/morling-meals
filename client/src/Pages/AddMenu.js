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

function AddMenu({...props}) {
    const { match } = props;
    let { date } = match.params
    
    console.log(date)

    const key = localStorage.getItem('token')

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

    const reqParam = {
      date: date,
      morning_tea: value.morning_tea,
      lunch: value.lunch,
      lunch_option_two: value.lunch_option_two,
      dinner: value.dinner,
      dinner_option_two: value.dinner_option_two,
      vegetarian: value.vegetarian,
      afternoon_tea: value.afternoon_tea,
      isAdded: true
    }

    const addMenu = (e) => {
    e.preventDefault()
    console.log('submit')
    console.log(reqParam)
    axios
        .post(`http://localhost:5000/api/menu/`, reqParam)
        .then(res => {
        console.log(res);
        if(res.data.data.status === "success") {
            alert(res.data.data.msg)
            props.history.push('/menu')
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

    useEffect(() => {
      getMenuForThisDate()
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

    const handleDelete = () => {
      console.log('Delete')
      console.log(menu._id)
      const deleteMenu = window.confirm('Are you sure you want to delete this menu?');
      if (deleteMenu === true) {
        console.log('yes')
        axios
          .delete(`http://localhost:5000/api/menu/delete/${menu._id}`)
          .then(res => {
            console.log(res.data);
            alert(res.data.data.msg)
            props.history.push('/menu')
          })
          .catch(err => {
            console.log(err);
        });
      }
    }

    const handleUpdateOnchange = (e) => {
      e.persist()
      console.log(e.target.name)
      console.log(e.target.value)

      setMenu(prevState =>({
      ...prevState, [e.target.name]: e.target.value
      }))
    }

    
    
    const handleUpdate = (e) => {
      e.preventDefault()
      console.log('Update')
      const updateParam = {
        morning_tea: menu.morning_tea,
        lunch: menu.lunch,
        lunch_option_two: menu.lunch_option_two,
        dinner: menu.dinner,
        dinner_option_two: menu.dinner_option_two,
        vegetarian: menu.vegetarian,
        afternoon_tea: menu.afternoon_tea,
      }
      console.log(menu._id)

      console.log(updateParam)
      axios
          .put(`http://localhost:5000/api/menu/update/${menu._id}`, updateParam)
          .then(res => {
            console.log(res.data);
            alert(res.data.data.msg)
            props.history.push('/menu')
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
            <Link className="header-brand" to="/admin">Morling Admin Dashboard</Link>
            <Button onClick={signOut} className="button-link">Signout</Button>
          </Navbar>
        ) : (
          <Redirect to="/login" />
        )
      }
        <main className="create-user">
          {
            menu === null ? (
              <Form className="form-holder" onSubmit={addMenu}>
                <h2>Create Menu for date: {moment(date).format('LL')}</h2>
                <FormGroup>
                    <Label className="label" for="morning_tea">Morning Tea</Label>
                    <Input onChange={handleOnchange} type="text" name="morning_tea" id="morning_tea" placeholder="Ham and Cheese Pizza" />
                </FormGroup>
                <FormGroup>
                    <Label className="label" for="afternoon_tea">Afternoon Tea</Label>
                    <Input onChange={handleOnchange} type="text" name="afternoon_tea" id="afternoon_tea" placeholder="Ham and Cheese Pizza" />
                </FormGroup>
                <FormGroup>
                    <Label className="label" for="lunch">Lunch</Label>
                    <Input onChange={handleOnchange} type="text" name="lunch" id="lunch" placeholder="Carbonara Penne" />
                </FormGroup>  
                <FormGroup>
                    <Label className="label" for="lunch_option_two">Lunch Option 2</Label>
                    <Input onChange={handleOnchange} type="text" name="lunch_option_two" id="lunch_option_two" placeholder="Carbonara Penne" />
                </FormGroup>              
                <FormGroup>
                    <Label className="label" for="dinner">Dinner</Label>
                    <Input onChange={handleOnchange} type="text" name="dinner" id="dinner" placeholder="Beef Steak with rice" />
                </FormGroup> 
                <FormGroup>
                    <Label className="label" for="dinner_option_two">Dinner</Label>
                    <Input onChange={handleOnchange} type="text" name="dinner_option_two" id="dinner_option_two" placeholder="Beef Steak with rice" />
                </FormGroup>
                <FormGroup>
                    <Label className="label" for="vegetarian">Vegetarian</Label>
                    <Input onChange={handleOnchange} type="text" name="vegetarian" id="vegetarian" placeholder="Resotto" />
                </FormGroup> 
                <Button className="btn-login">Add Menu</Button>
            </Form>
            ) : (
              <Form className="form-holder" onSubmit={handleUpdate}>
                <h2>Update Menu for date: {moment(date).format('LL')}</h2>
                <FormGroup>
                    <Label className="label" for="morning_tea">Morning Tea</Label>
                    <Input onChange={handleUpdateOnchange} value={menu.morning_tea} type="text" name="morning_tea" id="morning_tea" placeholder="Ham and Cheese Pizza" />
                </FormGroup>
                <FormGroup>
                    <Label className="label" for="afternoon_tea">Afternoon Tea</Label>
                    <Input onChange={handleUpdateOnchange} value={menu.afternoon_tea} type="text" name="afternoon_tea" id="afternoon_tea" placeholder="Ham and Cheese Pizza" />
                </FormGroup>
                <FormGroup>
                    <Label className="label" for="lunch">Lunch</Label>
                    <Input onChange={handleUpdateOnchange} value={menu.lunch} type="text" name="lunch" id="lunch" placeholder="Carbonara Penne" />
                </FormGroup>       
                <FormGroup>
                    <Label className="label" for="lunch_option_two">Lunch Option 2</Label>
                    <Input onChange={handleUpdateOnchange} value={menu.lunch_option_two} type="text" name="lunch_option_two" id="lunch_option_two" placeholder="Carbonara Penne" />
                </FormGroup>           
                <FormGroup>
                    <Label className="label" for="dinner">Dinner</Label>
                    <Input onChange={handleUpdateOnchange} value={menu.dinner} type="text" name="dinner" id="dinner" placeholder="Beef Steak with rice" />
                </FormGroup> 
                <FormGroup>
                    <Label className="label" for="dinner_option_two">Dinner Option 2</Label>
                    <Input onChange={handleUpdateOnchange} value={menu.dinner_option_two} type="text" name="dinner_option_two" id="dinner_option_two" placeholder="Beef Steak with rice" />
                </FormGroup> 
                <FormGroup>
                    <Label className="label" for="vegetarian">Vegetarian</Label>
                    <Input onChange={handleUpdateOnchange} value={menu.vegetarian} type="text" name="vegetarian" id="vegetarian" placeholder="Resotto" />
                </FormGroup> 
                <Button className="btn-login">Update</Button> <span>   </span>
                <Button className="btn-login" color="danger" onClick={() => handleDelete()}>Delete</Button>
            </Form>
            )
          }
            
        </main>
      </>
  );
}

export default AddMenu;
