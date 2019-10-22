import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import "./profile-view.scss";


import {connect} from 'react-redux';

 class ProfileView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      email: null,
      dob: null,
      userData: null,
      movies:[],
      favouriteFilms: []
    };
  }

  componentDidMount() {

    const accessToken = localStorage.getItem('token');
    console.log(accessToken);
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    let username = localStorage.getItem('user');
    console.log(username);
    axios.get(`https://my-flix-10.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log(response.data);
        this.setState({
          userData: response.data,
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          dob: response.data.DOB,
          favouriteFilms: response.data.FavoriteFilms
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeMovie(movieId) {
    event.preventDefault();

    axios.delete(`https://my-flix-10.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        this.getUser(localStorage.getItem('token'));
      })
      .catch(event => {
        alert('Error');
      });
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
   
    
  }
  removeUser(username) {
    event.preventDefault();

    axios.delete(`https://my-flix-10.herokuapp.com/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        this.getUser(localStorage.getItem('token','user'));
        alert('Profile Deleted');
        this.onLoggedOut();
        })
      .catch(event => {
        alert('Error');
      });
  }



  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { username, email, dob } = this.state;
    
    const favoriteFilmsList = this.props.movies.filter (movie => this.state.favouriteFilms.includes(movie._id));

    return (
     
           <Container>
                <Col>
                   <Card style={{ width: '25rem' }} className="profileview">
                      <Card.Body>
                      <Card.Title className="title">Profile View</Card.Title>
                      <p className="title" style={{ textAlign: "center" }}>View Your Information.</p>
                       <p className="title" style={{ textAlign: "center"}}>Or Delete Membership (Proceed With Caution!)</p>
                      <Card.Text>Username: {username}</Card.Text>
                      <Card.Text>Email:  {email}</Card.Text>
                      <Card.Text>Password:  ****</Card.Text>
                      <Card.Text>Birthday:  {dob}</Card.Text>
                        Favorite Movies:
                        { favoriteFilmsList.map(movie => (
                        <div key={movie._id} >{movie.Title}
                       {"  "}
                        <Button variant='danger' size='sm' onClick={e => this.removeMovie(movie._id)}>Remove </Button>
                        </div>
                      ))
                      }
                     
                     <Button variant='danger' size='sm' onClick={() => this.removeUser(username)}>Delete Profile</Button>
                      </Card.Body>
                  </Card>   
                  
                </Col>
              </Container>
     
    );
  }
}

export default connect (({movies , users}) =>({movies,users}))(ProfileView);












