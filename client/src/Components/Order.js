import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function Order() {
    
  return (
      <main className="order">
        <Form className="form-holder">
            <h1 className="title">May 02, 2021</h1>
            <FormGroup>
                <Label className="label" for="exampleSelect">Lunch</Label>
                <Input type="select" name="select" id="exampleSelect">
                    <option>Chicken Schnitzel</option>
                    <option>Roast Beef with Gravy</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label className="label" for="exampleSelect">Dinner</Label>
                <Input type="select" name="select" id="exampleSelect">
                    <option>Carbonara Penne with grated Cheese</option>
                    <option>Mac and Cheese with chicken and bacon</option>
                </Input>
            </FormGroup>
            <Button className="btn-submit">Submit</Button>
        </Form>
    </main>
  );
}

export default Order;
