var jwtSecret = 'your_jwt_secret';
var jwt = require('jsonwebtoken');
const passport = require('passport'); /*Login Authorization & JWT Generation Established*/
require('./passport');


function generateJWTToken(user) { 
    return jwt.sign(user, jwtSecret, {  /*JWT Token Generated*/
        subject: user.Username,
        expiresIn: '7d',
        algorithm: 'HS256'
    });
}

module.exports = (router) => {
 router.post('/login', (req, res) => {
   passport.authenticate('local', { session : false}, (error, user, info) => { /*Verifies Correct Username & Password Is Entered*/
     if (error || !user) {
       return res.status(400).json({
         message: 'Something is not right',
         user: user
       });
     }
     req.login(user, { session: false }, (error) => {
       if (error) {
         res.send(error);
       }
       var token = generateJWTToken(user.toJSON());
       return res.json({ user, token });
     });
   })(req, res);
 });
}