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

 /*onLoggedIn(user) {
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
     
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  newRegistration() {
   
    this.setState({
      newUser: true
    });
  }

  newMember() {
    this.setState({
      
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

    if(!user){

      if(newUser) return <RegistrationView newMember={ () => this.newMember()} onLoggedIn={user => this.onLoggedIn(user)}/>;
      
      else return <LoginView onLoggedIn = {user => this.onLoggedIn(user)} newUser = {() => this.newRegistration()} newMember={() =>this.newMember()}/>;
      
      }
      
      
      
      
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;  
          
          if (!movies) return <div className="main-view"/>;
      
          return (
            <div className="main-view">
             <Container>
                 <Row>
             {selectedMovie
                ? <MovieView movie={selectedMovie} onClick={() => this.clickButton()}/>
                : movies.map(movie => (
                  <Col>
                  <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
                  </Col>
                 ))
             }
                </Row>
            
             </Container>
            </div>
           );
         }
        }