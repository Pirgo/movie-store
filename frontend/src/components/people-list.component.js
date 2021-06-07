import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Filter from './filter.component'

const PeopleListHTML = props => (
    <div className="col-2">
        <Link to={"/people/" + props.person.id} className="text-decoration-none text-dark">
            <div className="card">
                <img className="card-img-top" src={props.person.photo} alt={props.person.name}></img>
                <div class="card-body">
                    <h5 class="card-title text-center">{props.person.name}</h5>

                </div>
            </div>
        </Link>
    </div>
)

export default class PeopleList extends Component {
    constructor(props) {
        super(props);
        this.state = { people: [], filter: {} };
        this.setFilter = this.setFilter.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/people')
            .then(response => {
                this.setState({ people: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    componentDidUpdate() {
        //console.log("UPDATED");

    }


    peopleList() {

        const people = this.state.people.map(person => {

            return <PeopleListHTML person={person} />;
        })
        if (people.length > 0) {
            return people
        }
        else {
            return (
                <>
                    <h1>No people to show</h1>
                </>
            )
        }
    }

    setFilter(arg) {
        //console.log(arg)
        // this.setState({ filter: arg }, () => {
        //     axios.post('http://localhost:5000/movie/filtered', { params: this.state.filter })
        //         .then(response => {

        //             this.setState({ movies: response.data })
        //             //console.log(response);
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         })
        // });
    }


    render() {
        return (
            <>
                <Filter setParentFilter={this.setFilter}></Filter>
                <div className="container">
                    <h3>People </h3>
                    <div className="row">
                        {this.peopleList()}

                    </div>
                </div>
            </>
        )
    }
}