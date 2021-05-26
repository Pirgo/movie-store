import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Library extends Component {
    constructor() {
        super();
        this.state = {
            access: "not authorized"
        }
    }


    componentDidMount() {
        const headers = {
            'Content-Type': "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        };

        axios.get('http://localhost:5000/library', { headers: headers })
            .then(response => {
                //console.log(response);
                this.setState({ access:"authorized" });
            })
            .catch((error) => {
                this.state = {
                    access: "not authorized"
                }
            });
    }


    render() {
        return (
            <>
                <h1>Library</h1>
                <h1>Access: {this.state.access}</h1>
            </>
        );
    }
}