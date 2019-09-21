const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; /*Script For Application Access With JWT Token Authorization*/
const Models = require('./models.js');
const passportJWT = require('passport-jwt');

var Users = Models.User;
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;


passport.use(new LocalStrategy({   /*Password & Username Validation*/
  usernameField: 'Username',
  passwordField: 'Password'
}, (username, password, callback) => {
  console.log(username + '  ' + password);
  Users.findOne({ Username: username }, (error, user) => {
    if (error) {
      console.log(error);
      return callback(error);
    }
    if (!user) {
      console.log('Incorrect Username');
      return callback(null, false, {message: 'Incorrect Username.'}); 
    }
    if (!user.validatePassword(password)) {
      console.log('Incorrect Password');
      return callback(null, false, {message: 'Incorrect Password.'});
    }
    console.log('Finished');
    return callback(null, user);
  });
}));

passport.use(new JWTStrategy({
 jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
 secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
 return Users.findById(jwtPayload._id)
 .then((user) => {
   return callback(null, user);
 })
 .catch((error) => {
   return callback(error)
 });
}));