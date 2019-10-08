import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { ProfileEdit } from "../profile-view/profile-edit";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import "./main-view.scss";

export class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
  }
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    this.setState({
      user: null
    });
    widow.open("/", _self);
  }

  getMovies(token) {
    axios
      .get("https://my-flix-10.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getUser(token) {
    axios
      .get("https://my-flix-10.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(function(error) {
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
      <Router>
        <Container className="main-view">
          <div>
            <Link to={"/users/${user}"}>
              <Button variant="light">Member Profile</Button>
            </Link>

            <Button variant="warning" onClick={() => this.onLoggedOut()}>
              {" "}
              Log Out{" "}
            </Button>
          </div>
          <Row>
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  );
                return movies.map(m => <MovieCard key={m._id} movie={m} />);
              }}
            />
            <Route path="/register" render={() => <RegistrationView />} />

            <Route
              exact
              path="/"
              render={() =>
                movies.map(m => <MovieCard key={m._id} movie={m} />)
              }
            />

            <Route
              path="/movies/:movieId"
              render={({ match }) => (
                <MovieView
                  movie={movies.find(m => m._id === match.params.movieId)}
                />
              )}
            />
            <Route
              path="/directors/:name"
              render={({ match }) => {
                if (!movies) return <div className="main-view" />;
                return (
                  <DirectorView
                    director={
                      movies.find(m => m.Director.Name === match.params.name).Director
                        
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
                      movies.find(m => m.Genre.Name === match.params.name).Genre
                    }
                  />
                );
              }}
            />
            <Route
              path="/users/:Username"
              render={({ match }) => {
                return <ProfileView userDetails={userDetails} />;
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
