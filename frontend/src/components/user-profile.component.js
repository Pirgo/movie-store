import axios from 'axios';
import React, { Component } from 'react';

export default class UserProfile extends Component {

    constructor() {
        super();
        this.state = {
            user: {},
            firstame: '',
            lastname: '',
            description: ''
        }
        this.newData = "";
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleFirstNameSubmit = this.handleFirstNameSubmit.bind(this);
        this.handleLastNameNameSubmit = this.handleLastNameNameSubmit.bind(this);
        this.handleDescriptionSubmit = this.handleDescriptionSubmit.bind(this);

    }

    handleFirstNameChange(event) {
        this.setState({ firstame: event.target.value });
    }
    handleLastNameChange(event) {
        this.setState({ lastname: event.target.value });
    }
    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }



    handleFirstNameSubmit(event) {
        console.log("KKK")
        axios.post('http://localhost:5000/user/profile/update/firstname',
            {
                value: this.state.firstame
            },
            {
                headers: { 'authorization': 'Bearer ' + localStorage.getItem("authToken") }
            }
        ).then(res => {
            console.log("AAA")
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        });
        //alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
        console.log("ERE")
    }

    handleLastNameNameSubmit(event) {
        axios.post('http://localhost:5000/user/profile/update/lastname',
            {
                value: this.state.lastname
            },
            {
                headers: { 'authorization': 'Bearer ' + localStorage.getItem("authToken") }
            }
        ).then(res => {
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        });
        //alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    handleDescriptionSubmit(event) {
        axios.post('http://localhost:5000/user/profile/update/description',
            {
                value: this.state.description
            },
            {
                headers: { 'authorization': 'Bearer ' + localStorage.getItem("authToken") }
            }
        ).then(res => {
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        });
        //alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    componentDidMount() {
        const headers = {
            'Content-Type': "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        };

        axios.get('http://localhost:5000/user/profile', { headers: headers })
            .then(response => {
                //log(response.data);
                this.setState({ user: response.data });
            })
            .catch((error) => {
                //console.log(error.error);

            });
    }

    render() {
        return (
            <>
                <h1>Your Profile</h1>
                <div class="row">
                    <img src={this.state.user.avatar} class="col-sm-12 col-md-5 col-lg-3" alt="Cover"></img>
                    <div class="col-sm-12 col-lg-9">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Field</th>
                                    <th scope="col">Value</th>
                                    <th scope="col">Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>User Name</td>
                                    <td>{this.state.user.userName}</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>email</td>
                                    <td>{this.state.user.email}</td>

                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Name</td>
                                    <td>{this.state.user.firstName}</td>
                                    <td>
                                        <form onSubmit={this.handleFirstNameSubmit}>
                                            <label>
                                                Change Name
                                                <input type="text" value={this.state.value} onChange={this.handleFirstNameChange} />
                                            </label>
                                            <input type="submit" value="Submit" />
                                        </form>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">4</th>
                                    <td>Last Name</td>
                                    <td>{this.state.user.lastName}</td>
                                    <td>
                                        <form onSubmit={this.handleLastNameNameSubmit}>
                                            <label>
                                                Change Name
                                                <input type="text" value={this.state.value} onChange={this.handleLastNameChange} />
                                            </label>
                                            <input type="submit" value="Submit" />
                                        </form>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">5</th>
                                    <td>Description</td>
                                    <td>{this.state.user.description}</td>
                                    <td>
                                    <form onSubmit={this.handleDescriptionSubmit}>
                                            <label>
                                                Change Name
                                                <input type="text" value={this.state.value} onChange={this.handleDescriptionChange} />
                                            </label>
                                            <input type="submit" value="Submit" />
                                        </form>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">7</th>
                                    <td>Date of join</td>
                                    <td>{this.state.user.createdAt}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}