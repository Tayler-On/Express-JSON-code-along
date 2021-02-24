"use strict";
const express = require("express");
const routes = express.Router();

const movies = [
  { id: 1, title: "2001: A Space Odyssey", year: 1968, animated: false },
  { id: 2, title: "The Godfather", year: 1972, animated: false },
  { id: 3, title: "The Lion King", year: 1994, animated: true },
  { id: 4, title: "Black Panther", year: 2018, animated: false },
];
//since it generates the id for us
let nextId = 5;

// GET /movies -respond with a JSON array of movies
routes.get("/movies", (req, res) => {
  res.json(movies);
});

//id on line 18 is a path param that can be called anything but you need to match it on the end of line 20s --- the path param always comes back (returns) as a string (even if you used a num like we do in the case of movie id )
routes.get("/movies/:id", (req, res) => {
  // add in parseInt() below to convert it to a number other wise the === on line 22 won't work
  const id = parseInt(req.params.id);
  // then use the id variable created on line 20 below
  const movie = movies.find((movie) => movie.id === id);
  //now it's time to send back the movie!
  if (movie) {
    // don't need to say res.status(200); here bc it's the default (already implied) it'll be 200 unless you tell it otherwise
    res.json(movie);
  }
  // this allows the 404 error to work you have to write out the code for it!!!
  else {
    res.status(404);
    res.send(`No movie with ${id} exists.`);
  }

  //.json will format it to json format and .send will literally send back whatever you send
});

routes.post("/movies", (req, res) => {
  const movie = req.body;
  movie.id = nextId++;
  movies.push(movie);
  res.status(201);

  //send back data about the new obj that was added
  res.json(movie);
});

routes.delete("/movies/:id", (req, res) => {
  //check to see if it ran at all with a console.log ---debugging
  console.log("Ran DELETE");
  const id = parseInt(req.params.id);
  const index = movies.findIndex((movie) => movie.id === id);
  //to check that it's not there aready, if it's not there it returns -1, if it returns anything else it's there and we need to splice!!!!
  if (index !== -1) {
    movies.splice(index, 1);
  }
  res.status(204);
  //but did it get all the way???
  console.log("Finish DELETE");
  // so it's still not working in postman bc you ALWAYS need to send a response!! Even if it's empty bc the client always sends a request to the server and the serve always sends back a response even an empty one!
  res.send();
});

// export routes for use in server.js
module.exports = routes;
