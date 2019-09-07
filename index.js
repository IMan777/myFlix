const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const port = process.env.port || 8080;

const app = express();

app.use(bodyParser.json());



let myMovies = [ /*Object Array Of Movies */
  {
    id: 1,
    title: "Shawshank Redemption",
    genre: "Drama",
    year: 1994,
    imgURL: "",
    director: {
      name: "Frank Darabont",
      birthYear: 1959,
      deathYear: 0000
    }
  },
  {
    id: 2,
    title: "Goodfellas",
    genre: "Crime Biography",
    year: 1990,
    imgURL: "",
    director: {
      name: "Martin Scorsese",
      birthYear: 1942,
      deathYear: 0000
    }
  },
  {
    id: 3,
    title: "Malcolm X",
    genre: "Biography",
    year: 1992,
    imgURL: "",
    director: {
      name: "Spike Lee",
      birthYear: 0,
      deathYear: 0000
    }
  },
  {
    id: 4,
    title: "Green Mile",
    genre: "Crime",
    year: 1999,
    imgURL: "",
    director: {
      name: "Frank Darabont",
      birthYear: 1959,
      deathYear: 0000
    }
  },
  {
    id: 5,
    title: "The Good, The Bad & The Ugly",
    genre: "Western",
    year: 1967,
    imgURL: "",
    director: {
      name: "Sergio Leone",
      birthYear: 1929,
      deathYear: 1989
    }
  },
  {
    id: 6,
    title: "Heat",
    genre: "Crime Thriller",
    year: 1995,
    imgURL: "",
    director: {
      name: "Michael Mann",
      birthYear: 1943,
      deathYear: 0000
    }
  },
  {
    id: 7,
    title: "Training Day",
    genre: "Crime Thriller",
    year: 2001,
    imgURL: "",
    director: {
      name: "Antoine Fuqua",
      birthYear: 1966,
      deathYear: 0000
    }
  },
  {
    id: 8,
    title: "Ray",
    genre: "Biography Drama",
    year: 2004,
    imgURL: "",
    director: {
      name: "Taylor Hackford",
      birthYear: 1944,
      deathYear: 0000
    }
  },
  {
    id: 9,
    title: "The Dark Knight",
    genre: "Crime Thriller",
    year: 2008,
    imgURL: "",
    director: {
      name: "Christopher Nolan",
      birthYear: 1970,
      deathYear: 0000
    }
  },
  {
    id: 10,
    title: "Avengers: Endgame",
    genre: "Fantasy Sci-Fi",
    year: 2019,
    imgURL: "",
    director: {
      name: "Joe Russo",
      birthYear: 1971,
      deathYear: 0000
    }
  }
];

let myDirectors = [ /*Object Array Directors*/
  {
    name: "Frank Darabont",
    birthYear: 1959,
    deathYear: 0000
  },
  {
    name: "Martin Scorsese",
    birthYear: 1942,
    deathYear: 0000
  },
  {
    name: "Spike Lee",
    birthYear: 0,
    deathYear: 0000
  },
  {
    name: "Sergio Leone",
    birthYear: 1929,
    deathYear: 1989
  },
  {
    name: "Michael Mann",
    birthYear: 1943,
    deathYear: 0000
  },
  {
    name: "Antoine Fuqua",
    birthYear: 1966,
    deathYear: 0000
  },
  {
    name: "Taylor Hackford",
    birthYear: 1944,
    deathYear: 0000
  },
  {
    name: "Christopher Nolan",
    birthYear: 1970,
    deathYear: 0000
  },
  {
    name: "Joe Russo",
    birthYear: 1971,
    deathYear: 0000
  }
];

let myMembers = [
  {
    id: 1,
    fullName: "John Doe",
    userName: "JDManX",
    pswrd: "DJ$#75N",
    email: "johndoe@yahoo.com",
    dob: "11/15/1975",
    favMovies: [2]
  }
];
/*Movie Script Start*/

/*Return List Of All Movies*/

app.get("/movies", (req,res) => {
  res.json(myMovies);
});
/*Retrieve One Movie From List By Movie Title*/

app.get("/movies/:title", (req, res) => {
  res.json(
    myMovies.find(movie => {
      return movie.title === req.params.title;
    })
  );
});

/*Retrieve Movies From List By Genre*/

app.get("/genre/:genre", (req, res) => {
  res.json(
    myMovies.find(movie => {
      return movie.genre === req.params.genre;
    })
  );
});
/*Retrieve Director Bio By Name*/

app.get("/director/:name", (req, res) => {
  res.json(
    myDirectors.find(director => {
      return director.name === req.params.name;
    })
  );
});

/* Add New Movie To List.*/
app.post("/movies", (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = "Missing Movie Title";
    res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4();
    myMovies.push(newMovie);
    res.status(201).send(newMovie);
  }
});

/* Delete A Movie By ID #*/
app.delete("/movies/:id", (req, res) => {
  let movie = myMovies.find(movie => {
    return movie.id === req.params.id;
  });

  if (movie) {
    myMovies.filter(function(obj) {
      return obj.id !== req.params.id;
    });
    res.status(201).send("Movie " + req.params.id + " deleted from list.");
  }
});
/*Movie Script End*/

/*Member Script Start*/
/*Return List Of All Members*/

app.get("/members", (req,res) => {
  res.json(myMembers);
});
/* Add New Member To Site.*/
app.post("/members", (req, res) => {
  let newMember = req.body;

  if (!newMember.fullName) {
    const message = "Missing Full Name / Bad Request";
    res.status(400).send(message);
  } else {
    newMember.id = uuid.v4();
    myMembers.push(newMember);
    res.status(201).send(newMember);
  }
});

/* Update Member Info.*/
app.put("/members/:id", (req, res) => {
  let member = myMembers.find(member => {
    return member.id === req.params.id;
  });

  let newMember = req.body;

  if (member && newMember) {
    newMember.id = member.id;
    Object.assign(member, newMember);

    myMembers = myMembers.map(member =>
      member.id === newMember.id ? newMember : member
    );
    res.status(201).send(member);
  } else if (!newMember.fullName) {
    const message = "Missing Full Name / Bad Request";
    res.status(400).send(message);
  } else {
    res.status(404).send("Member Not Found By Id");
  }
});

/* Delete A Member By ID #*/
app.delete("/members/:id", (req, res) => {
  let member = myMembers.find(member => {
    return member.id === req.params.id;
  });

  if (member) {
    myMembers.filter(function(obj) {
      return obj.id !== req.params.id;
    });
    res.status(201).send("Member " + req.params.id + " has been deleted.");
  }
});

/*Member Script End*/

app.listen(port, () => {
  console.log("Application Running Successfully");
});
