import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from "./components/navbar.component"
import MovieList from "./components/movie-list.component";
import Movie from "./components/movie.component";


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={MovieList} />
        <Route path="/movie/:id" component={Movie} />
      </div>
    </Router>
  );
}

export default App;