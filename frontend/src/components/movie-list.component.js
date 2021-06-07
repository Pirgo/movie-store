import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Filter from './filter.component'
import Pagination from '@material-ui/lab/Pagination';

const MovieListHTML = props => (
    <div className="row border align-items-center">
        <div className="col-3">
            <img src={props.movie.cover} width="150" height="200" alt="Cover"></img>
        </div>
        <div className="col-6">
            <h1><Link to={"/movie/" + props.movie.id} className="text-decoration-none text-dark">{props.movie.title}</Link></h1>
            <p>Release year: <span style={{ fontWeight: 'bold' }}>{props.movie.date.substring(0, 4)}</span></p>
        </div>
        <div className="col-3 text-right">
            <h2>{'\u2605'}Rate: {props.movie.rate.amount ? (props.movie.rate.sum / props.movie.rate.amount).toFixed(2) : "None"}</h2>
            <p>{props.movie.rate.amount} ratings</p>
            {
                props.isLogged &&
                <>
                    <a className="btn btn-secondary" href="#" onClick={() => { props.changeToWatch(props.movie.id, props.movie.title) }}>ToWatch</a>
                    <a className="btn btn-secondary" href="#" onClick={() => { props.changeToFavourites(props.movie.id, props.movie.title) }}>ToFav</a>
                    <a className="btn btn-secondary" href="#" onClick={() => { props.changeToSeen(props.movie.id, props.movie.title) }}>ToSeen</a>
                </>
            }
        </div>
    </div>
)

export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            filter: {},
            currPage: 1,
            pageCount: 10,
            isLogged: false
        };
        this.setFilter = this.setFilter.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        const body = { filter: this.state.filter, page: this.state.currPage }
        axios.post('http://localhost:5000/movie/filtered', body)
            .then(response => {
                this.setState({ movies: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
        axios.post('http://localhost:5000/movie/filtered/count', body)
            .then(response => {
                this.setState({ pageCount: Math.ceil(response.data / 30) });
            })
            .catch((error) => {
                console.log(error);
            })

        //this.userStateChanged()
    }

    componentDidUpdate() {
        //console.log("UPDATED");

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



    movieList() {

        const movieList = this.state.movies.map(currentMovie => {
            return <MovieListHTML movie={currentMovie} deleteMovie={this.deleteMovie} changeToWatch={this.changeToWatch}
                changeToFavourites={this.changeToFavourites} changeToSeen={this.changeToSeen} isLogged={this.state.isLogged} />;
        })
        if (movieList.length > 0) {
            return movieList
        }
        else {
            return (
                <>
                    <h1>No movies to show</h1>
                </>
            )
        }
    }

    setFilter(arg) {
        console.log(arg)
        this.setState({ filter: arg, currPage: 1 }, () => {
            const body = { filter: this.state.filter, page: this.state.currPage }
            console.log(body)
            axios.post('http://localhost:5000/movie/filtered', body)
                .then(response => {
                    console.log(response.data)
                    this.setState({ movies: response.data })

                })
                .catch((error) => {
                    console.log(error);
                })
            axios.post('http://localhost:5000/movie/filtered/count', body)
                .then(response => {
                    this.setState({ pageCount: Math.ceil(response.data / 30) })
                })
                .catch((error) => {
                    console.log(error);
                })
        });
    }

    changePage(event, page){
        console.log(event)
        this.setState({ currPage: page }, () => {
            const body = { filter : this.state.filter, page: this.state.currPage }
            axios.post('http://localhost:5000/movie/filtered', body)
                .then(response => {
                    this.setState({ movies: response.data });
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    }


    render() {
        return (
            <>
                <Filter setParentFilter={this.setFilter}></Filter>
                <Pagination count={this.state.pageCount} page={this.state.currPage} onChange={this.changePage} color='primary' />
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