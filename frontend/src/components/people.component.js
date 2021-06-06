import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Filter from './filter.component'


export default class People extends Component {
    constructor(props) {
        super(props)
        this.state = { human: { functions: { director: [], actor: [], writer: [] } } }
        this.actorsList = this.actorsList.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:5000/people/id/' + this.props.match.params.id)
            .then(response => {
                this.setState({ human: response.data });
            })
            .catch((error) => {
                console.log(error);
            })

    }

    directorList() {
        return this.state.human.functions.director.map((movie, i) => {
            return <li><Link to={"/movie/" + movie.movieID} className="text-dark">{movie.title}</Link></li>
        })
    }

    writerList() {
        return this.state.human.functions.writer.map((movie, i) => {
            return <li><Link to={"/movie/" + movie.movieID} className="text-dark">{movie.title}</Link></li>
        })
    }

    actorsList() {
        return this.state.human.functions.actor.map((movie, i) => {
            return <li><Link to={"/movie/" + movie.movieID} className="text-dark">{movie.title}</Link></li>
        })
    }

    render() {
        return (
            <div className="container">
                <h1>{this.state.human.firstName} {this.state.human.lastName}</h1>
                <div className="row">
                    <div className="col-3">
                        <img src={this.state.human.photo} width="225" height="300" alt="Cover"></img>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-4">
                                Directed:
                            <ul>
                                    {this.directorList()}
                                </ul>
                            </div>
                            <div className="col-4">
                                Wrote:
                            <ul>
                                    {this.writerList()}
                                </ul>
                            </div>
                            <div className="col-4">
                                Played role in:
                            <ul>
                                    {this.actorsList()}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}