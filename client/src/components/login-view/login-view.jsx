import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import './login-view.scss'



export function LoginView(props) {
    
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

 const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('https://my-flix-10.herokuapp.com/login', { 
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('Nonexistent User')
    });
  }; 

 
  return (
     <Container>
    <Form className='loginForm'>
      <Form.Group controlId ="formBasicUsername">
      <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId ="formBasicPassword">  
      <Form.Label>Password:</Form.Label>
        <Form.Control type="password"  placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
        
      <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      
    </Form>
    </Container>
  );

    
}




