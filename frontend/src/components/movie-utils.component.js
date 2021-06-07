import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class MovieUtils extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieID: props.movieID,
            movieTitle: "",
            isLogged: false,
            isWatched: false,
            isFavourite: false,
            isSeen: false
        }
        axios.get('http://localhost:5000/movie/id/' + props.movieID + '/title')
            .then(res => {
                this.setState({ movieTitle: res.data.title });
            });

        console.log(props);
        this.changeLibState = this.changeLibState.bind(this);
    }

    componentDidMount() {
        this.userStateChanged();

    }

    changeLibState(section) {
        console.log(section);
        if (!localStorage.getItem("authToken")) {
            return;
        }
        const header = {
            'authorization': 'Bearer ' + localStorage.getItem("authToken")
        };

        const body = {
            movieID: this.state.movieID, 
            title: this.state.movieTitle
        };

        let BASE_URL = 'http://localhost:5000/libmodifying/' + section;

        if (section === "towatch") {
            this.state.isWatched ? BASE_URL += '/remove' : BASE_URL += '/add';
        } else if (section === 'favourites') {
            this.state.isFavourite ? BASE_URL += '/remove' : BASE_URL += '/add';
        } else if (section === 'seen') {
            this.state.isSeen ? BASE_URL += '/remove' : BASE_URL += '/add';
        }

        axios.post(BASE_URL, body, { headers: header })
        .then(res => {
            this.userStateChanged();
        });

    }

    userStateChanged() {

        if (!localStorage.getItem("authToken")) {
            return;
        }

        const header = {
            'authorization': 'Bearer ' + localStorage.getItem("authToken")
        };

        axios.get('http://localhost:5000/users/username', { headers: header })
            .then(res => {
                this.setState({
                    isLogged: res.data.success,
                });
            });
        const BASE_URL = 'http://localhost:5000/libmodifying/';

        axios.post(BASE_URL + 'towatch/checkstate', { movieID: this.state.movieID }, { headers: header })
            .then(res => {
                res.data.found ? this.setState({ isWatched: true }) : this.setState({ isWatched: false });
            });
        axios.post(BASE_URL + 'favourites/checkstate', { movieID: this.state.movieID }, { headers: header })
            .then(res => {
                res.data.found ? this.setState({ isFavourite: true }) : this.setState({ isFavourite: false });
            });

        axios.post(BASE_URL + 'seen/checkstate', { movieID: this.state.movieID }, { headers: header })
            .then(res => {
                res.data.found ? this.setState({ isSeen: true }) : this.setState({ isSeen: false });
            });

    }




    render() {
        return (
            <>
                {
                    this.state.isLogged ?
                        (
                            <div>
                                <p>Manage Library</p>
                                {
                                    this.state.isLogged &&
                                    <>
                                        <a className={this.state.isWatched ? 'btn btn-danger' : 'btn btn-success'} href="#" onClick={() => { this.changeLibState("towatch") }}>
                                            {this.state.isWatched ? 'Remove from To Watch' : 'Add to Watch'}
                                        </a>
                                        <a className={this.state.isFavourite ? 'btn btn-danger' : 'btn btn-success'} href="#" onClick={() => { this.changeLibState("favourites") }}>
                                            {this.state.isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
                                        </a>
                                        <a className={this.state.isSeen ? 'btn btn-danger' : 'btn btn-success'} href="#" onClick={() => { this.changeLibState("seen") }}>
                                            {this.state.isSeen ? 'Remove from Seen' : 'Add to Seen'}
                                        </a>
                                    </>
                                }
                            </div>
                        )
                        :
                        (
                            <p> You need yo log in to add movie to library</p>
                        )
                }
            </>
        );
    }

}

{/* <h2>{'\u2605'}Rate: {this.state.movie.rate.amount ? (this.state.movie.rate.sum / this.state.movie.rate.amount).toFixed(2) : "None"}</h2>
                                <p>{this.state.movie.rate.amount} ratings</p> */}
