import React from 'react';
import axios from 'axios';

/*import { BrowserRouter as Router, Route} from "react-router-dom";*/

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

 /*componentDidMount() {
    axios.get('https://my-flix-10.herokuapp.com/movies') 
    
    .then(response => {
      this.setState({
        movies: response.data
      });
    }).catch(function (error) {
      console.log(error);
    });
  } */

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onMovieClick(movie) {  /*Wont't Be Needed Eventually */
    this.setState({
      selectedMovie: movie
    });
  }

  clickButton() {  /*Wont't Be Needed Eventually */
    this.setState({
      selectedMovie: null
    });
  }

 
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut (){
     localStorage.removeItem('token');
     localStorage.removeItem('user');
     this.setState({
       user:null
      })
     widow.open('/', _self);
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

  /*getUser(token) {
    axios.get('https://my-flix-10.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}`}
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

  updateUser(data){
  this.setState({
  userInfo.data

})
 localStorage.setItem('user', data.Username);
}

*/ 

  newRegistration() {
   
    this.setState({
      newUser: true  /*Wont't Be Needed Eventually */
    });
  }

  newMember() {
    this.setState({   /*Wont't Be Needed Eventually */
      
      newUser: null
    });
  }

  render() {
    const {
      movies,
      selectedMovie,
      user,
      
    } = this.state;

   /* if(!user){

      if(newUser) return <RegistrationView newMember={ () => this.newMember()} onLoggedIn={user => this.onLoggedIn(user)}/>;
      
      else return <LoginView onLoggedIn = {user => this.onLoggedIn(user)} newUser = {() => this.newRegistration()} newMember={() =>this.newMember()}/>;
      
      }; */
      
      
      
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
           
           /*<Router>
         <div className="main-view">
         <Route exact path="/" render={() => {if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;return movies.map(m => <MovieCard key={m._id} movie={m}/>)
  }}/>
           <Route path="/register" render={() => <RegistrationView />} />
          <Route exact path="/" render={() => movies.map(m => <MovieCard key={m._id} movie={m}/>)}/>
          <Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
         </div>
         <Route path="/directors/:name" render={({ match }) => {if (!movies) return <div className="main-view"/>; 
  return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>}
} />
          <Route path="/genres/:name" render={({ match }) => {if (!movies) return <div className="main-view"/>;
  return <GenreView director={movies.find(m => m.Genre.Name === match.params.name).Genre}/>}
} />
          <Route path="/users/:Username" render={({match}) =>{return <ProfileView userInfo={userInfo} />}} />
          <Route path="/edit/:Username" render={() => <ProfileEdit userInfo={userInfo} user={user} token={token} updateUser={data => this.updateUser(data)} />} />


</Router> */
           
           
           
           );
         }
        }