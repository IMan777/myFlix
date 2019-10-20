import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input'
import { MovieCard } from '../movie-card/movie-card';
import Container from 'react-bootstrap/Container';

const mapStateToProps = state => {
    const { movies, visibilityFilter, sortMovies } = state;

    let moviesDisplay = movies.concat().sort((a,b) => {
        if (a[sortMovies] < b[sortMovies]) return -1;
        if (a[sortMovies] > b[sortMovies]) return 1;
        return 0;
    });

    if (visibilityFilter !== '') {
        moviesDisplay = moviesDisplay.filter(movie => movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }
    return { movies: moviesDisplay };
};

function MoviesList(props){
    const { movies } = props;

    if (!movies) return <div className='main-view' />

   
    function logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.reload();
        
    }
    return (

<Container>
    <div>
        <Button onClick={() => logOut()}>Log Out</Button>
        <Link to={`/users/:Username`}><Button>Profile</Button></Link>

        <VisibilityFilterInput  />
    </div>
    <Row>
        {movies.map(movie => (
        <Col key={movie._id} xs={8} sm={6} md={4} lg={4}>
            <MovieCard key={movie._id} movie={movie} />
        </Col>
        ))
        }
    </Row>
</Container>
  
    )
}

export default connect(mapStateToProps)(MoviesList);
