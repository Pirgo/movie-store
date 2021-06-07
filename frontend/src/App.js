import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from "./components/navbar.component"
import MovieList from "./components/movie-list.component";
import Movie from "./components/movie.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Library from "./components/library.component"
import UserProfile from "./components/user-profile.component"
import People from './components/people.component';
import PeopleList from './components/people-list.component';



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
          <Route path="/library" exact component={Library} />
          <Route path="/user/profile" exact component={UserProfile} />
          <Route path="/people/:id" component={People}/>
          <Route path="/people" component={PeopleList}/>
        </div>
      
    </Router>
  );
}

export default App;