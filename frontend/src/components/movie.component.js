import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import MovieUtils from './movie-utils.component';

export default class Movie extends Component {

    constructor(props) {
        super(props);
        // this.state = {movie: props.movie}
        this.state = {
            movie: { directors: [], writers: [], genre: [], date: "", rate: {}, platforms: [], actors: [] },
            isLogged: false
        }
        // this.deleteMovie = this.deleteMovie.bind(this);
        // this.addToWatch = this.addToWatch.bind(this)
        // this.addToFavourites = this.addToFavourites.bind(this)
        // this.addToSeen = this.addToSeen.bind(this)
        // this.changeToWatch = this.changeToWatch.bind(this)
        // this.changeToFavourites = this.changeToFavourites.bind(this)
        // this.changeToSeen = this.changeToSeen.bind(this)

    }

    componentDidMount() {
        axios.get('http://localhost:5000/movie/id/' + this.props.match.params.id)
            .then(response => {
                this.setState({ movie: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        this.userStateChanged()
    }

    userStateChanged() {
        if (localStorage.getItem("authToken")) {
            axios.get('http://localhost:5000/users/username', {
                headers: { 'authorization': 'Bearer ' + localStorage.getItem("authToken") }
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






    directorsList() {
        return this.state.movie.directors.map((dir, i) => {
            let link = <>
                <Link to={"/people/" + dir.id} className="text-dark">{dir.name}</Link>
                <span> / </span>
            </>
            return link;
        })
    }

    writersList() {
        return this.state.movie.writers.map((writer, i) => {
            let link = <>
                <Link to={"/people/" + writer.id} className="text-dark">{writer.name}</Link>
                <span> / </span>
            </>
            return link

        })
    }

    genreList() {
        let arrLen = this.state.movie.genre.length
        return this.state.movie.genre.map((genre, i) => {
            if (i === arrLen - 1) {
                return genre
            }
            return genre + " / ";
        })
    }

    //TODO url links
    platformsList() {
        let arrLen = this.state.movie.platforms.length
        return this.state.movie.platforms.map((platform, i) => {
            if (i === arrLen - 1) {
                return platform.name
            }
            return platform.name + " / ";
        })
    }

    actorsList() {
        return this.state.movie.actors.map((actor, i) => {
            return <li key={actor.id}><Link to={"/people/" + actor.id} className="text-dark">{actor.name}</Link> as {actor.character}</li>
        })
    }


    runtimeConvert() {
        let time = this.state.movie.runtime
        let h = Math.floor(time / 60)
        let m = time % 60
        if (m === 0) {
            return String(h) + "h"
        }
        else if (h === 0) {
            return String(m) + "min"
        }
        else {
            return String(h) + "h " + String(m) + "min"
        }
    }

    calculateRate() {
        let sum = this.state.movie.rate.sum;
        let amount = this.state.movie.rate.amount;
        if (amount === 0) {
            return "None"
        }
        else {
            return (sum / amount).toFixed(2)
        }
    }


    render() {
        //console.log(this.state.movie.directors)
        return (
            <div className="container">
                <h1>{this.state.movie.title}</h1>
                <p>{this.state.movie.date.substring(0, 4)} {this.runtimeConvert()}</p>
                <div className="row align-items-end">
                    <div className="col-auto">
                        <h2>{'\u2605'}{this.calculateRate()}</h2>
                    </div>
                    <div className="col-auto">
                        <p>{this.state.movie.rate.amount} raiting</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <img src={this.state.movie.cover} width="225" height="300" alt="Cover"></img>
                    </div>
                    <div className="col-9">
                        <p>{this.state.movie.plot}</p>
                        <p>Directors: {this.directorsList()}</p>
                        <p>Writers: {this.writersList()}</p>
                        <p>Genre: {this.genreList()}</p>
                        <p>Premiere: {this.state.movie.date.substring(0, 10)}</p>
                        <p>Available on: {this.platformsList()}</p>
                        <p>Actors:</p>
                        <ul>
                            {this.actorsList()}
                        </ul>
                    </div>

                </div>
                <MovieUtils movieID={this.props.match.params.id}></MovieUtils>

            </div>
        );

    }
}