import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const labels = {
    0: 'No Rate',
    1: 'Silly',
    2: 'Wacky',
    3: 'Ok',
    4: 'Good',
    5: 'Legendary',
};

export default class MovieUtils extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieID: props.movieID,
            movieTitle: "",
            isLogged: false,
            isWatched: false,
            isFavourite: false,
            isSeen: false,
            value: 0,
            hover: 0
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
                                <div class="row">
                                    <div class="col">
                                        <p>Rate Movie</p>
                                        <Rating
                                            name="rating"
                                            size="large"
                                            value={this.state.value}
                                            onChange={(event, newValue) => {
                                                this.setState({ value: newValue });

                                            }}
                                            onChangeActive={(event, newHover) => {
                                                this.setState({ hover: newHover });
                                            }

                                            }
                                        />
                                        {
                                            this.state.value !== null &&
                                            <Box ml={2}>
                                                {labels[this.state.hover !== -1 ? this.state.hover : this.state.value]}
                                            </Box>
                                        }

                                        <br />
                                    </div>
                                    <div class="col">
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
                                </div>
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
