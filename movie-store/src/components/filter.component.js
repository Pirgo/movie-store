import React, { Component } from 'react';
import axios from 'axios';

export default class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            runtime: [],
            years: [],
            genres: [],
            platforms: [],
            value: { runtime: "mock", year: "mock", genre: "mock", platform: "mock" }
        };
        this.value = { runtime: "mock", year: "mock", genre: "mock", platform: "mock" }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/movie/filters/runtime')
            .then(response => {
                this.setState({ runtime: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get('http://localhost:5000/movie/filters/year')
            .then(response => {
                this.setState({ years: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get('http://localhost:5000/movie/filters/genre')
            .then(response => {
                this.setState({ genres: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get('http://localhost:5000/movie/filters/platform')
            .then(response => {
                this.setState({ platforms: response.data });
            })
            .catch((error) => {
                console.log(error);
            });

    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }
    handleChange(event) {
        console.log(event.target.id)
        //this.value[String(event.target.id)] = event.target.value
        //this.setState((value['runtime']:event.target.va))
        switch (event.target.id) {
            case 'runtime':
                this.setState({ value: { runtime: event.target.value } })
                break
            case 'year':
                this.setState({ value: { year: event.target.value } })
                break
            case 'genre':
                this.setState({ value: { genre: event.target.value } })
                break
            case 'platform':
                this.setState({ value: { platform: event.target.value } })
                break
        }
        console.log(event)
        // this.setState({ value: event.target.value });
        this.props.setParentFilter(event.target.value);
    }

    render() {
        const runtimeList = this.state.runtime.map(opt => <option value={opt} id={opt}>{opt}</option>);
        const yearList = this.state.years.map(year => <option value={year} id={year}>{year}</option>);
        const genreList = this.state.genres.map(genre => <option value={genre} id={genre}>{genre}</option>);
        const platformList = this.state.platforms.map(platform => <option value={platform} id={platform}>{platform}</option>);
        return (
            <form onSubmit={this.handleSubmit} >
                <select value={this.state.value.runtime} onChange={this.handleChange} id="runtime">
                    <option selected="selected">-</option>
                    {runtimeList}
                </select>
                <select value={this.state.value.year} onChange={this.handleChange} id="year">
                    <option selected="selected">-</option>
                    {yearList}
                </select>
                <select value={this.state.value.genre} onChange={this.handleChange} id="genre">
                    <option selected="selected">-</option>
                    {genreList}
                </select>
                <select value={this.state.value.platform} onChange={this.handleChange} id="platform">
                    <option selected="selected">-</option>
                    {platformList}
                </select>
                <input type="submit"></input>
            </form>
        );
    }
}