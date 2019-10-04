import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      newUser: false
    };
  }

  componentDidMount() {
    axios.get('https://my-flix-10.herokuapp.com/movies')
    /*Endpoint To Access Movie List From DataBase/API  */
    .then(response => {
      this.setState({
        movies: response.data
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  clickButton() {
    this.setState({
      selectedMovie: null
    });
  }

 /* onLoggedIn(user) {
    this.setState({
      user
    });
  }*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  getMovies(token) {
    axios.get('https://my-flix-10.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  newRegistration() {
    /*Function To Register A New Member*/
    this.setState({
      newUser: true
    });
  }

  newMember() {
    this.setState({
      /*New Member Established*/
      newUser: null
    });
  }

  render() {
    const {
      movies,
      selectedMovie,
      user,
      newUser
    } = this.state;

    if (!user) {
      if (newUser) return React.createElement(RegistrationView, {
        newMember: () => this.newMember(),
        onLoggedIn: user => this.onLoggedIn(user)
      });else return React.createElement(LoginView, {
        onLoggedIn: user => this.onLoggedIn(user),
        newUser: () => this.newRegistration(),
        newMember: () => this.newMember()
      });
    }

    if (!user) return React.createElement(LoginView, {
      onLoggedIn: user => this.onLoggedIn(user)
    });
    if (!movies) return React.createElement("div", {
      className: "main-view"
    });
    return React.createElement("div", {
      className: "main-view"
    }, React.createElement(Container, {
      className: "mainContain"
    }, React.createElement(Row, null, selectedMovie ? React.createElement(MovieView, {
      movie: selectedMovie,
      onClick: () => this.clickButton()
    }) : movies.map(movie => React.createElement(Col, null, React.createElement(MovieCard, {
      key: movie._id,
      movie: movie,
      onClick: movie => this.onMovieClick(movie)
    }))))));
  }

}