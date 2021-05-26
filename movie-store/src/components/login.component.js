import React, { Component, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            success: "",
            isLogged: false

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {

        if (localStorage.getItem("authToken")) {
            this.setState({
                isLogged: true
            });
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        //console.log(this.state)
    }



    handleSubmit(event) {

        event.preventDefault();

        const headers = {
            'Content-Type': "application/json"
        };

        const data = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post(
            'http://localhost:5000/auth/login',
            data,
            { headers: headers }
        ).then(res => {
            //console.log(res);
            this.setState({
                success: "Logged in!",
                isLogged: true
            });
            localStorage.setItem("authToken", res.data.token);
            window.location.reload();
            // console.log(context);
        }).catch(err => {
            //console.log(err.response);
            this.setState({
                error: err.response.data.error
            });
        });

    }

    handleLogout() {
        localStorage.removeItem("authToken");
        this.setState({
            isLogged: false
        });
        window.location.reload();
    }


    render() {
        return (
            <>
                {
                    (this.state.isLogged) ?
                        (
                            <div>
                                <h1>Looged in</h1>
                                <button onClick={this.handleLogout} className="btn btn-primary">Logout</button>
                            </div>
                        ) :
                        (
                            <div>
                                <form onSubmit={this.handleSubmit} >
                                    <h3>Login</h3>
                                    {this.state.error && <span className="text-danger">{this.state.error}</span>}
                                    <br />
                                    {this.state.success && <span className="text-success">{this.state.success}</span>}
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <br />
                                        <input
                                            name="email"
                                            type="email"
                                            size="30"
                                            required
                                            placeholder="Email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                        />

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <br />
                                        <input
                                            name="password"
                                            type="password"
                                            size="30"
                                            required
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                        />

                                    </div>
                                    <button type="submit" className="btn btn-primary">Log in</button>
                                </form >
                                <small>
                                    Don't have account?
                                    <Link to="/auth/register">Register</Link>
                                </small>
                            </div >
                        )
                }</>
        );
    }

}