import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Filter from './filter.component'


const MovieListHTML = props => (
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
            {
            props.isLogged &&
            <>
            <a href="#" onClick={() => {props.addToWatch(props.movie._id, props.movie.title)}}>ToWatch</a>
            <a href="#" onClick={() => {props.addToFavourites(props.movie._id, props.movie.title)}}>ToFav</a>
            <a href="#" onClick={() => {props.addToSeen(props.movie._id, props.movie.title)}}>ToSeen</a>
            </>
            }
        </div>
    </div>
)

export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = { movies: [], filter: {}, isLogged: false};
        this.setFilter = this.setFilter.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
        this.addToWatch = this.addToWatch.bind(this)
        this.addToFavourites = this.addToFavourites.bind(this)
        this.addToSeen = this.addToSeen.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:5000/movie')
            .then(response => {
                this.setState({ movies: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
        this.userStateChanged()
    }

    componentDidUpdate() {
        //console.log("UPDATED");

    }

    userStateChanged() {
        if (localStorage.getItem("authToken")) {
            axios.get('http://localhost:5000/users/username', {
                headers: { 'authorization': 'Beaver ' + localStorage.getItem("authToken") }
            }
            ).then(res => {
                this.setState({
                    isLogged: res.data.success,
                });
            })
        }
    }


    deleteMovie(id) {
        axios.delete('http://localhost:5000/movie/id/' + id)
            .then()//res => console.log(res.data));
        this.setState({
            movies: this.state.movies.filter(el => el._id !== id)
        })
    }

    addToWatch(id, title){
        if (localStorage.getItem("authToken")) {
            axios.post('http://localhost:5000/libmodifying/towatch/add',{movieID: id, title: title},  {
                headers: { 'authorization': 'Bearer ' + localStorage.getItem("authToken") }
            }
            ).then(res => {
                //console.log(res)
            })
        }
    }

    addToFavourites(id, title){
        if (localStorage.getItem("authToken")) {
            axios.post('http://localhost:5000/libmodifying/favourites/add',{movieID: id, title: title},  {
                headers: { 'authorization': 'Bearer ' + localStorage.getItem("authToken") }
            }
            ).then(res => {
                //console.log(res)
            })
        }
    }

    addToSeen(id, title){
        if (localStorage.getItem("authToken")) {
            axios.post('http://localhost:5000/libmodifying/seen/add',{movieID: id, title: title},  {
                headers: { 'authorization': 'Bearer ' + localStorage.getItem("authToken") }
            }
            ).then(res => {
                //console.log(res)
            })
        }
    }




    movieList() {

        const movieList = this.state.movies.map(currentMovie => {
            return <MovieListHTML movie={currentMovie} deleteMovie={this.deleteMovie} addToWatch={this.addToWatch} 
            addToFavourites={this.addToFavourites} addToSeen={this.addToSeen} isLogged={this.state.isLogged}/>;
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
        //console.log(arg)
        this.setState({ filter: arg }, () => {
            axios.post('http://localhost:5000/movie/filtered', { params: this.state.filter })
            .then(response => {

                this.setState({ movies: response.data }).then(this.render());
                //console.log(response);
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