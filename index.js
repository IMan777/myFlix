const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.port || 8080;

let myMovies = [ 
{
    movieTitle : 'Shawshank Redemption',
    type : 'Drama',
    year: '1994'
},
{
    movieTitle : 'Goodfellas',
    type : 'Crime Biography',
    year: '1990'
},
{
    movieTitle : 'Malcolm X',
    type : 'Biography',
    year: ' 1992'
},
{
    movieTitle : 'Green Mile',
    type : 'Fantasy Crime',
     year: '1999'
},
{
    movieTitle : 'The Good, The Bad & The Ugly',
    type : 'Western',
    year: '1967'
},
{
    movieTitle : 'Heat',
    category : 'Crime Thriller',
    year: '1995'
},
{
    movieTitle : 'Training Day',
    category : 'Crime Thriller',
    year: '2001'
},
{
    movieTitle : 'Ray',
    category : 'Biography Drama',
    year: '2004'
},
{
    movieTitle : 'The Dark Knight',
    category : 'Crime Thriller',
    year: '2008'
},
{
    movieTitle : 'Avengers: Endgame',
    category : 'Fantasy Sci-Fi',
    year: '2019'
},
]

app.use(express.static('public')); /*Retrieves Files From Public Folder*/


app.use(morgan('common'));/*Log Info With Morgon*/

// GET Requests
app.get('/', function(req, res) {
  res.send('<h3>Welcome!</h3>' )
});
app.get('/info', function(req, res) {
  res.send('<h4>Please Navigate To The Movies To View My Top 10 Movies</h4')
});

/* Send Request Function Not Needed Due To Express Static Being Used
app.get('/documentation', function(req, res) {                  
  res.sendFile('public/documentation.html', { root : __dirname } )
}); */

app.get('/movies', function(req, res) {
  res.json(myMovies)
});


app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!'); /*Error Checking*/
});


app.listen(port);