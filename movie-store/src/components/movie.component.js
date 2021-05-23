import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Movie extends Component {

    constructor(props) {
        super(props);
        // this.state = {movie: props.movie}
        this.state = {movie: {directors: [], writers: [], genre: [], date: ""}}
        
    }
    
    componentDidMount() {
        axios.get('http://localhost:5000/movie/id/' + this.props.match.params.id)
            .then(response => {
                this.setState({ movie: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
        
    }

    directorsList(){
        let arrLen = this.state.movie.directors.length
        return this.state.movie.directors.map((dir, i) => {
            if (i == arrLen - 1){
                return dir.directorName
            }
            return dir.directorName + " / ";
        })
    }

    writersList(){
        let arrLen = this.state.movie.writers.length
        return this.state.movie.writers.map((writer, i) => {
            if (i == arrLen - 1){
                return writer.writerName
            }
            return writer.writerName + " / ";
        })
    }

    genreList(){
        let arrLen = this.state.movie.genre.length
        return this.state.movie.genre.map((genre, i) => {
            if (i == arrLen - 1){
                return genre
            }
            return genre + " / ";
        })
    }


    render() {
        console.log(this.state.movie.directors)
        return(
            <div className="container">
                <h1>{this.state.movie.title}</h1>
                <p>{this.state.movie.date.substring(0,4)}</p>
                <div className="row">
                    <div className="col-auto">
                        <img src={this.state.movie.cover}></img>
                    </div>
                    <div className="col-auto">
                        <p>{this.state.movie.plot}</p>
                        <p>Directors: {this.directorsList()}</p>
                        <p>Writers: {this.writersList()}</p>
                        <p>Genre: {this.genreList()}</p>
                    </div>

                </div>
            </div>
        );
        
    }
}