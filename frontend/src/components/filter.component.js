import React, { Component } from 'react';
import axios from 'axios';

export default class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            runtime: [],
            dates: [],
            genres: [],
            platforms: [],
            value: { runtime: "-", date: "-", genre: "-", platforms: "-", title: "-" }
        };
        //this.value = { runtime: "mock", year: "mock", genre: "mock", platform: "mock" }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.btnClick = this.btnClick.bind(this);
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
                this.setState({ dates: response.data });
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
        //alert('Your favorite flavor is: ' + this.state.value);
        const selectArr = event.target.querySelectorAll('select');
        const searchInput = event.target.querySelector('#title');
        searchInput.value = ""
        this.setState(prevState => {
            let value = {...prevState.value}                    // creating copy of state variable value
            selectArr.forEach((el,i,arr)=>{
                value[String(el.id)] = "-"
            })
            value["title"] = "-"       
            return { value };                                 // return new object value object
          }, () => this.props.setParentFilter(this.state.value))
        
        event.preventDefault();
        

    }
    handleChange(event) {
        this.setState(prevState => {
            let value = {...prevState.value}                    // creating copy of state variable value
            value[String(event.target.id)] = event.target.value      //zmiana odpowiedniego pola obiektu       
            return { value };                                 // return new object value object
          }, () => this.props.setParentFilter(this.state.value))
    }

    btnClick(event){
        event.preventDefault();
        let title = event.target.parentElement.querySelector('#title').value
        if (title === ""){
            title = "-"
        }
        this.setState(prevState => {
            let value = {...prevState.value}                    // creating copy of state variable value
            value["title"] = title      
            return { value };                                 // return new object value object
          }, () => this.props.setParentFilter(this.state.value))
    }

    render() {
        const runtimeList = this.state.runtime.map(opt => <option value={opt} id={opt}>{opt}</option>);
        const yearList = this.state.dates.map(year => <option value={year} id={year}>{year}</option>);
        const genreList = this.state.genres.map(genre => <option value={genre} id={genre}>{genre}</option>);
        const platformList = this.state.platforms.map(platform => <option value={platform} id={platform}>{platform}</option>);
        return (
            <form onSubmit={this.handleSubmit} >
                <label for="runtime">Runtime</label>
                <select value={this.state.value.runtime} onChange={this.handleChange} id="runtime">
                    <option selected="selected">-</option>
                    {runtimeList}
                </select>
                <label for="date">Year</label>
                <select value={this.state.value.date} onChange={this.handleChange} id="date">
                    <option selected="selected">-</option>
                    {yearList}
                </select>
                <label for="genre">Genre</label>
                <select value={this.state.value.genre} onChange={this.handleChange} id="genre">
                    <option selected="selected">-</option>
                    {genreList}
                </select>
                <label for="platforms">Platform</label>
                <select value={this.state.value.platforms} onChange={this.handleChange} id="platforms">
                    <option selected="selected">-</option>
                    {platformList}
                </select>
                <input type="submit" value="clear filters"></input>
                <br></br>
                <input type="text" id="title"></input>
                <button onClick={this.btnClick}>Search</button>
            </form>
        );
    }
}