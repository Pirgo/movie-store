import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            isLogged: false,
            username: ""
        }
        this.userStateChanged = this.userStateChanged.bind(this);
    }

    componentDidMount() {
        this.userStateChanged();
        
    }

    userStateChanged() {
        if (localStorage.getItem("authToken")) {
            axios.get('http://localhost:5000/users/username',{
            headers:{'authorization': 'Beaver '+localStorage.getItem("authToken")}
        }
        ).then(res => {
            this.setState({
                isLogged: true,
                username: res.data.name
            });
        })   
        }
    }

    render() {

        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">movie-store</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">movies</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Exercise Log</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/auth/login" className="nav-link">Log in</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/auth/register" className="nav-link">Register</Link>
                        </li>

                        {
                            this.state.isLogged &&
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">{this.state.username}</Link>
                            </li>
                        }

                    </ul>
                </div>
            </nav>
        );
    }
}
