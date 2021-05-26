import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserProfile extends Component {

    componentDidMount() {
        const headers = {
            'Content-Type': "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        };

        axios.get('http://localhost:5000/user/profile', { headers: headers })
            .then(response => {
                console.log(response.data);
                //this.setState({ access: "authorized", lib: response.data });
            })
            .catch((error) => {
                //console.log(error.error);
                
            });
    }

    render() {
        return (
            <h1>User profile</h1>
        );
    }
}