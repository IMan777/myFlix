import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import "./profile-view.scss";



export class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      dob: null,
      userData: null,
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
  removeUser(username) {
    event.preventDefault();

    axios.delete(`https://my-flix-10.herokuapp.com/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        this.getUser(localStorage.getItem('token'));
        
        })
      .catch(event => {
        alert('Error');
      });
  }



  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { username, email, dob, favouriteFilms } = this.state;

    return (
     
      <Card style={{ width: '25rem' }} className="profileview">
      
        <Card.Body >
        
          <Card.Title className="title">Profile View</Card.Title>
          <p className="title" style={{ textAlign: "center" }}>View Your Information.</p>
          <p className="title" style={{ textAlign: "center"}}>Or Delete Membership (Proceed With Caution!)</p>
          <ListGroup>
            <ListGroup.Item>Username: {username}</ListGroup.Item>
            <ListGroup.Item>Password: xxxxx </ListGroup.Item>
            <ListGroup.Item>Email: {email}</ListGroup.Item>
            <ListGroup.Item>Birthday: {dob}</ListGroup.Item>
            <ListGroup.Item>Favourite Films:
            {this.props.movies.map(movie => {
              if (movie._id === favouriteFilms.find(favFilm => favFilm === movie._id)) {
                return <p key={movie._id}>{movie.Title}    <Button variant='danger' size='sm' onClick={() => this.removeMovie(movie._id)}>Remove</Button></p>
              } else if (!favouriteFilms) {
                return <p>No Favorite Movies</p>
              }
            })}
            </ListGroup.Item>
            <ListGroupItem><Button variant='danger' size='sm' onClick={() => this.removeUser(username)}>Delete Profile</Button></ListGroupItem>
          </ListGroup>
          
        </Card.Body>
        
      </Card>
     
     
    );
  }
















}












