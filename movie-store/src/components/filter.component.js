import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Filter extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            runtime: [],
            value: "mock value"
        };
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
    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
        this.props.setParentFilter(event.target.value);
    }

    render() {
        console.log(this.state);
        const runtimeList = this.state.runtime.map(opt => <option value={opt}id={opt}>{opt}</option>);
        return (
            <form onSubmit={this.handleSubmit} >
                <select value={this.state.value} onChange={this.handleChange}>
                    {runtimeList}
                </select>
                <input type="submit"></input>
            </form>
        );
    }
}