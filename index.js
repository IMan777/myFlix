const express = require("express");
const bodyParser = require("body-parser");  /*Declarations*/
const mongoose = require('mongoose');
const passport = require('passport');
const Models = require('./models.js');
const cors = require('cors');
const path = require("path");


const port = process.env.PORT || 5000;



const Movies = Models.Movie;
const Users =  Models.User;

require('./passport');

const app = express();

const { check, validationResult } = require('express-validator');


/* mongoose.connect('mongodb://localhost:27017/myFlixDB', { useUnifiedTopology: true }); Replaces { useNewUrl
Parser: true } Due Deprecation Warning From GIT Bash Terminal*/

mongoose.connect('mongodb+srv://myFlixDBadmin:75RT62@mycluster-dxwcr.mongodb.net/myFlixDB?retryWrites=true&w=majority', { useUnifiedTopology: true }); /*Connection With MongoDB Atlas Database Established*/

app.use(cors()); 
app.use(bodyParser.json());


const auth = require('./auth.js') (app);

app.use(express.static("public"));
app.use('/client', express.static(path.join(__dirname, 'client/dist')));

app.get("/client/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});



app.get('/',(req,res) =>{

res.send('<h1>Welcome To My Flix App!</h1><h4><a href="https://my-flix-10.herokuapp.com/client/">Please Login</a></h4>'); /*Default Greeting*/

});


/*Movie Script Start*/

app.get('/movies',passport.authenticate('jwt',{ session:false}), function(req , res){ 
    
    Movies.find()
     .then(function(movies){
        res.status(201).json(movies)   /*Returns All Movies*/
    })
     .catch(function(error){
        console.error(error);
        res.status(500).send("Error" + err);
    }); 
});

app.get('/movies/:Title', function(req , res){
    
    Movies.find({Title : req.params.Title})
     .then(function(movies){
        res.status(201).json(movies)   /*Returns One By Title*/
    })
     .catch(function(error){
        console.error(error);
        res.status(500).send("Error" + err);
    }); 
});

app.get('/movies/director/:Name',function(req , res){
    
    Movies.findOne({"Director.Name" : req.params.Name})
     .then(function(movies){
        res.status(201).json(movies.Director)   /*Returns Director By Name*/
    })
     .catch(function(error){
        console.error(error);
        res.status(500).send("Error" + err);
    }); 
});

app.get('/movies/genres/:Title', function(req , res){
    
    Movies.findOne({Title : req.params.Title})
     .then(function(movie){
        res.status(201).send(movie.Genre.Name + ' : '+ movie.Genre.Description)   /*Returns Genre Info By Movie Title*/
    })
     .catch(function(error){
        console.error(error);
        res.status(500).send("Error" + error);
    }); 
});

/*Movie Script End*/

/*User Script Start*/

app.post('/users', [

   check('Username','Username Is Required').isLength({min: 5}),
   check('Username','Username Must Contain Alphanumeric Chracters').isAlphanumeric(),  /*Verifies Correct Info Is Entered*/
   check('Password','Password Required').not().isEmpty(),
   check('Email','Valid Email Required').isEmail()

] , (req, res) => {
  
 var errors = validationResult(req);
 
 if (!errors.isEmpty()){
  return res.status(422).json({ errors: errors.array() });

}

 var hashedPassword = Users.hashPassword(req.body.Password);    
  Users.findOne({ Username : req.body.Username })
  .then(function(user) {
    if (user) {
      return res.status(400).send("Member Under Username " + req.body.Username + " Is Already Registered");  /*Adds New User*/
    } else {
      Users
      .create({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        DOB: req.body.DOB
      })
      .then(function(user) {res.status(201).json(user) }) 
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

app.get('/users', passport.authenticate('jwt',{ session:false}),function(req , res){
    
    Users.find()
     .then(function(users){
        res.status(201).json(users)   /*Returns All Users*/
    })
     .catch(function(error){
        console.error(error);
        res.status(500).send("Error" + error);
    }); 
});

/*app.put('/users/:Username', passport.authenticate('jwt',{ session:false}), function(req, res) {
  req.checkBody('Username', 'Username is required').notEmpty();
  req.checkBody('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric();
  req.checkBody('Password', 'Password is required').notEmpty();
  req.checkBody('Email', 'Email is required').notEmpty();
  req.checkBody('Email', 'Email does not appear to be valid').isEmail();  Maintain For Possible Future Use
  // check the validation object for errors
  const errors = req.validationErrors();
  if (errors) {
    return res.status(422).json({ errors: errors });
  }
  Users.findOneAndUpdate({ Username : req.params.Username }, { $set : 
    Username : req.body.Username,
    Password : req.body.Password,
    Email : req.body.Email,
    DOB : req.body.DOB
   
  }},
  { new : true }, 
  function(error, updatedUser) {
    if(error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    } else {
      res.json(updatedUser)
    }
  })
}); */

app.put('/users/:Username', passport.authenticate('jwt', { session: false }), function (req, res) {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $set:                                                                                     /*Allows User To Update Their Info*/
    {
      Username: req.body.Username,
      Password: Users.hashPassword(req.body.Password),
      Email: req.body.Email,
      DOB: req.body.DOB
    }
  },
    { new: true },
    function (error, updatedUser) {
      if (error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      } else {
        res.json(updatedUser)
      }
    })
  });
app.get('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) => { /*Allows To Retrieve User Info*/ 
  Users.findOne({ Username: req.params.username })
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Request error: ' + err);
    });
});

app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt',{ session:false}), function(req, res) {  /*Allows User To Add A New Favorite Movie*/
  Users.findOneAndUpdate({ Username : req.params.Username }, {
    $push : { FavoriteFilms : req.params.MovieID }
  },
  { new : true }, 
  function(error, updatedUser) {
    if (error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    } else {
      res.json(updatedUser)
    }
  })
});

app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt',{ session:false}), function(req, res) {  /*Allows User To Delete A Favorite Movie*/
  Users.findOneAndUpdate({ Username : req.params.Username }, {
    $pull : { FavoriteFilms : req.params.MovieID }
  },
  { new : true }, 
  function(error, updatedUser) {
    if (error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    } else {
      res.status(201).send("Movie Under ID # " + req.params.MovieID + " Has Been Deleted From Member's Account.");
    }
  })
});



app.delete('/users/:Username', passport.authenticate('jwt',{ session:false}), function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then(function(user) {
    if (!user) {
      res.status(400).send(req.params.Username + "User Account Not Found");  /*Allows User To Delete-Derigester Their Account*/
    } else {
      res.status(200).send(req.params.Username + "  User Account Has Been Deleted.");
    }
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});
/*User Script End*/




app.listen(port, "0.0.0.0", () => {
  console.log("Application Running Successfully!");
});


function newFunction() {
  return Users.hashPassword(req.body.Password);
}

