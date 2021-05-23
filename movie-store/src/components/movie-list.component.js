import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const MovieList = props => (
    <div className="row border">
        <div className="col">
            <h1><Link to={"/movie/" + props.movie._id}>{props.movie.title}</Link></h1>
            <p>{props.movie.runtime} </p>
        </div>
        <div className="col">
            <img src={props.movie.cover}></img>
        </div>
    </div>
)

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);
        //this.deleteMovie = this.deleteMovie.bind(this);
        this.state = { movies: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/movie')
            .then(response => {
                this.setState({ movies: response.data });
                console.log(this.state.movies);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // deleteExercise(id) {
    //     axios.delete('http://localhost:5000/exercises/' + id)
    //         .then(res => console.log(res.data));
    //     this.setState({
    //         exercises: this.state.exercises.filter(el => el._id !== id)
    //     })
    // }
    
    
    movieList() {
        return this.state.movies.map(currentMovie => {
            return <MovieList movie={currentMovie}/>;
        })
    }

    render() {
        return (
            <div className="container">
                <h3>Movies </h3>
                <div>
                    {this.movieList()}
                </div>
            </div>
        )
    }
}