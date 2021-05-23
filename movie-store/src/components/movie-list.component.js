import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Filter from './filter.component'


const MovieList = props => (
    <div className="row border align-items-center">
        <div className="col-3">
            <img src={props.movie.cover}></img>
        </div>
        <div className="col-6">
            <h1><Link to={"/movie/" + props.movie._id}>{props.movie.title}</Link></h1>
        </div>
        <div className="col-3">
            <h2>{'\u2605'}Rate: {props.movie.rate.sum}</h2>
        </div>
    </div>
)

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);
        //this.deleteMovie = this.deleteMovie.bind(this);
        this.state = { movies: [], filter: {} };
        //this.filter = {}
        this.setFilter = this.setFilter.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/movie')
            .then(response => {
                this.setState({ movies: response.data });
                //console.log(this.state.movies);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    componentDidUpdate() {
        console.log("UPDATED");

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

    setFilter(arg) {
        this.setState({filter: arg});
        axios.post('http://localhost:5000/movie/filtered', {params: this.state.filter})
            .then(response => {
                this.setState({ movies: response.data });
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        console.log(this.state.filter)

        return (
            <>
            <Filter setParentFilter={this.setFilter}></Filter>
            <div className="container">
                <h3>Movies </h3>
                <div>
                    {this.movieList()}
                </div>
            </div>
            </>
        )
    }
}