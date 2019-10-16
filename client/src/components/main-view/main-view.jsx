import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import {connect} from "react-redux";



import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { ProfileEdit } from "../profile-view/profile-edit";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Navbar from 'react-bootstrap/Navbar';

import {setLogin , setMovies} from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import  MovieView  from "../movie-view/movie-view";

import "./main-view.scss";

 class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      user: null,
      userDetails:{},
      email: '',
      dob:'',
      username:null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
      this.getUser(localStorage.getItem("user"),accessToken);
    }
  }

  getMovies(token) {
    axios
      .get("https://my-flix-10.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }    /*Will Review*/
      })
      .then(response => {
        this.props.setMovies(response.data);
        this.setState({
         
          movies: response.data

        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
    this.props.setLogin(authData.user);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
   
    this.setState({
      user: null
    });
  }


  getUser(token) {
    axios
      .get("https://my-flix-10.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${token}` } /*Will Review*/
      })
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  editUser(data) {
    this.setState({
      userDetails: data
    });
    localStorage.setItem("user", data.Username);
  }

  render() {
    const { movies, user, token, userDetails } = this.state;

    if (!movies) return <div className="main-view" />;

    return (
      <Router basename="/client">
        <Container>
          <Navbar className="navigateBar" bg="light"  sticky="top" >
            <Link to={"/users/${user}"}>
              <Button variant="secondary" size="sm">View Profile</Button>
            </Link>
            {"   "}
            <Link to={"/edit/:Username"}>
              <Button variant="secondary" size="sm">Edit Profile </Button>
            </Link>
            {"   "}
            <Link to={`/`}>
              <Button variant="secondary" size="sm" onClick={() => this.onLoggedOut()}>Log Out</Button>
            </Link>
            {"   "}
            <Link to={`/`}>
              <Button variant="secondary" size="sm">Return</Button>
              </Link> 
              <h3 className="appTitle">My Flix App!</h3>
          </Navbar>
          <Row>
          
           <Route exact path="/" render={() => {
             if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
             return <MoviesList/>;
            }} />
            <Route path="/register" render={() => <RegistrationView />} />

            

            <Route 
              path="/movies/:movieId" 
              render={({match}) => 
              <MovieView movie={movies.find(movie => movie._id === match.params.movieId)}/>}
              />
            <Route
              path="/directors/:name"
              render={({ match }) => {
                if (!movies) return <div className="main-view" />;
                return (
                  <DirectorView
                    director={
                      movies.find(movie => movie.Director.Name === match.params.name).Director

                    }
                  />
                );
              }}
            />
            <Route
              path="/genres/:name"
              render={({ match }) => {
                if (!movies) return <div className="main-view" />;
                return (
                  <GenreView
                    genre={
                      movies.find(movie => movie.Genre.Name === match.params.name).Genre
                    }
                  />
                );
              }}
            />
            <Route
              path="/users/:Username"
              render={({ match }) => {
                return <ProfileView userDetails={userDetails} movies={movies} />;
              }}
            />
            <Route
              path="/edit/:Username"
              render={() => (
                <ProfileEdit
                  userDetails={userDetails}
                  user={user}
                  token={token}
                  editUser={data => this.editUser(data)}
                />
              )}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}
export default connect(mapStateToProps, { setMovies ,setLogin } )(MainView);