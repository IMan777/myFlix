const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var movieSchema = mongoose.Schema({
   Title : {type: String, required: true},
   Description: {type: String, required: true}, /*Movie Schema Defined*/
   Genre :{
      Name: String,  
      Description: String   
    }, 
    Director :{
        Name: String,
        Bio  :String,
        Birth: Date,
    },
    ImagePath: String,
    Featured: Boolean
});

var userSchema = mongoose.Schema({
    
    Username : {type: String, required: true}, /*User Schema Defined*/
    Password : {type: String, required: true},
    Email : {type: String, required: true},
    DOB : Date,
    FavoriteFilms : [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}] 
});

userSchema.statics.hashPassword = function(password){
    return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password , this.Password); };


var Movie = mongoose.model('Movie', movieSchema); /*Models Established To Interact With Schemas*/
var User = mongoose.model('User' , userSchema);

module.exports.Movie = Movie; /*Models Exported*/
module.exports.User = User;