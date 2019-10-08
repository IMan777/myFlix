import React, {useState,useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function ProfileEdit(props){
  const {
         Username: prevUsername,
         Password: prevPassword,
         Email: prevEmail,
         DOB: prevDOB
   } = userDetails;
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [email, setEmail] = useState('');
   const [DOB, setDOB] = useState('');

   useEffect (() => {
       setUsername(prevUsername);
       setPassword(prevPassword);
       setEmail(prevEmail);
       setDOB(prevDOB); 
    }, [prevUsername,prevPassword,prevEmail,prevDOB]);

    const user = props.user;

    const handleEdit = e => {
       e.preventDefault();
       const userDetails = {
         Username: prevUsername,
         Password: prevPassword,
         Email: prevEmail,
         DOB: prevDOB

};

const handleDeletion = (e) => {
    e.preventDefault();
    axios.delete('https://may-flix-10.herokupp.com/users/${user}',{
       headers: {Authorization: 'Bearer ${localStorage.getItem("token")}' }
    })
      .then(response => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/', '_self');
     })
       .catch(e => {
         alert('Deletion Error');
     });
  } 

  axios.put('https://my-flix-10.herokuapp.com/users/${user}',
    userDetails,
      {
        headers: {Authorization: 'Bearer ${localStorage.getItem("token")}' }
      }, ) 
     then(response => {
       props.editUser(userDetails);
       console.log('Profile Edited');
       alert('Profile Edited Successfully');
     })
     .catch(e => {
        const errors = e.response.data.errors || [];
        let errorMsg = '';
        errors.forEach(err => {
          errorMsg += err.msg;
       });
       alert('Error In Editing Profile $(errorMsg)')
      });
}

 return(
     <Form>
      <Form.Group controlId ="formBasicUsername">
      <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Set Username"  value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId ="formBasicPassword"> 
      <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Set Password"  value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group controlId ="formBasicEmail"> 
      <Form.Label>Email:</Form.Label>
        <Form.Control type="email" value={email} placeholder="Enter EMail"  onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlId ="formBasicDOB"> 
      <Form.Label>Date Of Birth:</Form.Label>
        <Form.Control type="date" value={DOB}  placeholder="Enter Date of Birthday" onChange={e => setDOB(e.target.value)} />
      </Form.Group>
      <div>
      <Button variant="success" type="submit" onClick={handleEdit}>Edit Profile</Button>
       <br></br>
      <Button variant="success" type="submit" onClick={handleDeletion}>Delete Profile</Button>
      <br></br>
       <Link to={`/`}><Button variant="outline-info">Return</Button></Link> 
       </div>
       
    </Form>
   
 );
 }

