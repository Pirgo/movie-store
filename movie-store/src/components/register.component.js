import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            username: "",
            password1: "",
            password2: "",
            error: "",
            success: ""

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const headers = {
            'Content-Type': "application/json",
        };

        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password1
        }

        if(this.state.password1 != this.state.password2) {
            this.setState({
                error: "Passwords must be the same"
            });
            return;
        }

        axios.post(
            'http://localhost:5000/auth/register',
            data,
            { headers: headers }
        ).then(res => {
            //console.log(res);
            this.setState({
                success: "Registered!"
            });
            localStorage.setItem("authToken", res.data.token);
        }).catch(err => {
            //console.log(err.response);
            this.setState({
                error: err.response.data.error
            });
        });

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Register</h3>
                    {this.state.error && <span className="text-danger">{this.state.error}</span>}
                    <br />
                    {this.state.success && <span className="text-success">{this.state.success}</span>}

                    <div className="form-group">
                        <label htmlFor="username">User Name:</label>
                        <br />
                        <input
                            name="username"
                            type="text"
                            required
                            placeholder="User Name"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <br />
                        <input
                            refs="email"
                            name="email"
                            type="email"
                            required
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password1">Password:</label>
                        <br />
                        <input
                            name="password1"
                            type="password"
                            required
                            placeholder="Password"
                            value={this.state.password1}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password2">Confirm password:</label>
                        <br />
                        <input
                            name="password2"
                            type="password"
                            required
                            placeholder="Confirm password"
                            value={this.state.password2}
                            onChange={this.handleChange}
                        />

                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                <small>
                    Haveave account?
                    <Link to="/auth/login">Login</Link>
                </small>
            </div>
        );
    }
}