import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from "./components/navbar.component"
import MovieList from "./components/movie-list.component";
import Movie from "./components/movie.component";
import Login from "./components/login.component";
import Register from "./components/register.component";

import PrivateRoute from "./components/private-route.component"


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        
        <Route path="/" exact component={MovieList} />
        <Route path="/movie/:id" component={Movie} />
        <Route path="/auth/login" exact component={Login} />
        <Route path="/auth/register" exact component={Register} />
      </div>
    </Router>
  );
}

export default App;