const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.port || 8080;

let myMovies = [ 
{
    movieTitle : 'Shawshank Redemption',
    type : 'Drama',
    year: '  '
},
{
    movieTitle : 'Goodfellas',
    type : 'Crime Biography',
     year: '  '
},
{
    movieTitle : 'Malcolm X',
    type : 'Biography',
     year: '  '
},
{
    movieTitle : 'Green Mile',
    type : 'Fantasy Crime',
     year: '  '
},
{
    movieTitle : 'The Good, The Bad & The Ugly',
    type : 'Western',
     year: '  '
},
{
    movieTitle : 'Heat',
    category : 'Crime Thriller',
     year: '  '
},
{
    movieTitle : 'Training Day',
    category : 'Crime Thriller',
     year: '  '
},
{
    movieTitle : 'Ray',
    category : 'Biography Drama',
     year: '  '
},
{
    movieTitle : 'The Dark Knight',
    category : 'Crime Thriller',
     year: '  '
},
{
    movieTitle : 'Avengers: Endgame',
    category : 'Fantasy Sci-Fi',
     year: '  '
},
]

app.use(express.static('public')); /*Retrieves Files From Public Folder*/


app.use(morgan('common'));/*Log Info With Morgon*/

// GET Requests
app.get('/', function(req, res) {
  res.send('Home Page' )
});
app.get('/info', function(req, res) {
  res.send('<h2>Please Navigate To The Movies To View My Top 10 Movies</h2')
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