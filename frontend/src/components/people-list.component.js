import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Filter from './filter.component'

const PeopleListHTML = props => (
    <div class="card" witdth="18rem">
        <img src={props.person.photo} idth="150" height="200" alt="..." />
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
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
            console.log(person.photo);
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

                <div className="card-columns">
                    <h3>People </h3>
                    <div>
                        {this.peopleList()}
                    </div>
          
                </div>
            </>
        )
    }
}