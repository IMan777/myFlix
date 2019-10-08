import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
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
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    let username = localStorage.getItem('user');
    axios.get('https://my-flix-10.herokuapp.com/users/${username}', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          userData: response.data,
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          dob: response.data.DOB,
          favouriteFilms: response.data.FavouriteFilms
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeMovie(event, favouriteFilm) {
    event.preventDefault();
    console.log(favouriteFilm);
    axios.delete(`https://my-flix-10.herokuapp.com/users/${localStorage.getItem('user')}/FavouriteFilms/${favoriteFilm}`, {
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
      <Card   style={{ width: '25rem' }}>
        
        <Card.Body className="profileview">
          <Card.Title>Profile</Card.Title>
          <ListGroup>
            <ListGroup.Item>Username: {username}</ListGroup.Item>
            <ListGroup.Item>Password: Not Displayed For Security Purposes </ListGroup.Item>
            <ListGroup.Item>Email: {email}</ListGroup.Item>
            <ListGroup.Item>Birthday: {dob}</ListGroup.Item>
            <ListGroup.Item>Favourite Films:
             <div>
                {favouriteFilms.length === 0 &&
                  <div className="value">No Favorites Added</div>
                }
                {favouriteFilms.length > 0 &&
                  <ul>
                    {favouriteFilms.map(favouriteFilm =>
                      (<li key={favouriteFilm}>
                        <p>
                          {JSON.parse(localStorage.getItem('movies')).find(movie => movie._id === favouriteFilm).Title}
                        </p>
                        <Link to={`/movies/${favouriteFilm}`}>
                          <Button size="sm" variant="info">Open</Button>
                        </Link>
                        <Button variant="secondary" size="sm" onClick={(event) => this.removeMovie(event, favouriteFilm)}>
                          Delete Movie 
                        </Button>
                       
                      </li>)
                    )}
                  </ul>
                }
              </div>
            </ListGroup.Item>
          </ListGroup>
          <div >
            <Link to={`/`}>
              <Button variant="dark">Return</Button>
            </Link>
          
            <Link to={`/edit/:Username`}>
              <Button  variant="light">Edit Profile</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    );
  }
}












