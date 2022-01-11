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

        //console.log(this.context)
        this.userStateChanged();
    }

    userStateChanged() {
        if (localStorage.getItem("authToken")) {
            axios.get('http://localhost:5000/users/username', {
                headers: { 'authorization': 'Bearer ' + localStorage.getItem("authToken") }
            }
            ).then(res => {
                this.setState({
                    isLogged: res.data.success,
                    username: res.data.name
                });
            })
        }
    }

    userInfo(isLogged) {
        //console.log("Upadeting " + isLogged);
        return <>
            {isLogged ?
                (<li className="navbar-item">
                    <Link to="/" className="nav-link">{this.state.username}</Link>
                </li>)
                :
                (<></>)
            }
        </>
    };


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
                            <Link to="/people/" className="nav-link">people</Link>
                        </li>

                        {
                            !this.state.isLogged &&
                            <li className="navbar-item">
                                <Link to="/auth/login" className="nav-link">Log in</Link>
                            </li>
                        }
                        {
                            !this.state.isLogged &&
                            <li className="navbar-item">
                                <Link to="/auth/register" className="nav-link">Register</Link>
                            </li>
                        }
                        <li className="navbar-item">
                            <Link to="/library" className="nav-link">Library</Link>
                        </li>

                        {/* <LoggedContext.Consumer>
                            { (isLogged)  => {
                                return this.userInfo(isLogged);
                            }}
                        </LoggedContext.Consumer> */}

                        {
                            this.state.isLogged &&
                            <li className="navbar-item">
                                <Link to="/user/profile" className="nav-link">{this.state.username}</Link>
                            </li>
                        }

                        {
                            this.state.isLogged &&
                            <li className="navbar-item">
                                <Link to="/auth/login" className="nav-link">Logout</Link>
                            </li>
                        }

                    </ul>
                </div>
            </nav>
        );
    }
}
