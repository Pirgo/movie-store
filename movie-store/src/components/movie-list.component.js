import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Filter from './filter.component'


const MovieList = props => (
    <div className="row border align-items-center">
        <div className="col-3">
            <img src={props.movie.cover} width="150" height="200" alt="Cover"></img>
        </div>
        <div className="col-6">
            <h1><Link to={"/movie/" + props.movie._id} className="text-decoration-none text-dark">{props.movie.title}</Link></h1>
            <p>Release year: <span style={{fontWeight: 'bold'}}>{props.movie.date.substring(0,4)}</span></p>
        </div>
        <div className="col-3 text-right">
            <h2>{'\u2605'}Rate: {props.movie.rate.amount ? (props.movie.rate.sum/props.movie.rate.amount).toFixed(2) : "None"}</h2>
            <p>{props.movie.rate.amount} ratings</p>
            <a href="#" onClick={() => {props.deleteMovie(props.movie._id)}}>Delete</a>
        </div>
    </div>
)

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);
        this.state = { movies: [], filter: {} };
        this.setFilter = this.setFilter.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/movie')
            .then(response => {
                this.setState({ movies: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    componentDidUpdate() {
        console.log("UPDATED");

    }



    deleteMovie(id) {
        axios.delete('http://localhost:5000/movie/id/' + id)
            .then(res => console.log(res.data));
        this.setState({
            movies: this.state.movies.filter(el => el._id !== id)
        })
    }


    movieList() {

        const movieList = this.state.movies.map(currentMovie => {
            return <MovieList movie={currentMovie} deleteMovie={this.deleteMovie}/>;
        })
        if(movieList.length > 0){
            return movieList
        }
        else{
            return(
                <>
                <h1>No movies to show</h1>
                </>
            )
        }
    }

    setFilter(arg) {
        console.log(arg)
        this.setState({ filter: arg }, () => {
            axios.post('http://localhost:5000/movie/filtered', { params: this.state.filter })
            .then(response => {

                this.setState({ movies: response.data }).then(this.render());
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        });
        
    }

    render() {
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