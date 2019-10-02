import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import './login-view.scss'



export function LoginView(props) {
    
  const [ username, enterUsername ] = useState(' ');
  const [ password, enterPassword ] = useState(' ');

  
  const handleSubmit = (e) => {
e.preventDefault();
props.onLoggedIn(username);
console.log(username, password);
};



  

 return (
     <Container>
    <Form className='loginForm'>
      <Form.Group controlId ="formBasicUsername">
      <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => enterUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId ="formBasicPassword">  
      <Form.Label>Password:</Form.Label>
        <Form.Control type="password"  placeholder="Enter Password" value={password} onChange={e => enterPassword(e.target.value)} />
      </Form.Group>
        <Form.Group controlId="formBasicCheckBox">
        <Form.Check type="checkbox" label="Check Me Out"/>
       </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      
    </Form>
    </Container>
  );

    
}




LoginView.propTypes ={
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    newUser: PropTypes.func.isRequired,
    onLoggedIn: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
 
 };