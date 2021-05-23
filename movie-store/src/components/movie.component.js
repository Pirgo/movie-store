import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Movie extends Component {

    constructor(props) {
        super(props);
        // this.state = {movie: props.movie}
        this.state = {movie: {}}
    }
    
    componentDidMount() {
        axios.get('http://localhost:5000/movie/' + this.props.match.params.id)
            .then(response => {
                this.setState({ movie: response.data });
                console.log(this.state.movie);
            })
            .catch((error) => {
                console.log(error);
            })
    }


    render() {
        return(
            <h1>{this.state.movie.title}</h1>
            // <tr>
            // <td>{props.exercise.username}</td>
            // <td>{props.exercise.description}</td>
            // <td>{props.exercise.duration}</td>
            // <td>{props.exercise.date.substring(0, 10)}</td>
            // <td>
            //     <Link to={"/edit/" + props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
            // </td>
        //</tr>
        );
        
    }
}