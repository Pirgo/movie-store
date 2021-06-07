import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchPeople from './search-people.component';
import Pagination from '@material-ui/lab/Pagination';

const PeopleListHTML = props => (
    <div className="col-6  col-sm-4 col-md-3 col-lg-2">
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
        this.state = {
            people: [],
            filter: {},
            currPage: this.props.match.params.number,
            startPage: this.props.match.params.number,
            pageCount: 10,

        };
        this.setFilter = this.setFilter.bind(this);
        this.changePage = this.changePage.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:5000/people/page/' + this.state.currPage)
            .then(response => {
                this.setState({ people: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
        
        axios.get('http://localhost:5000/people/count')
            .then(response => {
                this.setState({pageCount: Math.ceil(response.data/30)})
            })
    }

    componentDidUpdate() {
        if (this.state.currPage !== this.props.match.params.number) {
            this.setState({currPage : this.props.match.params.number}, ()=>{
                axios.get('http://localhost:5000/people/page/' + this.state.currPage)
                .then(response => {
                    this.setState({ people: response.data });
                })
                .catch((error) => {
                    console.log(error);
                })
            }) 
        }


    }


    changePage(event, page){
        this.props.history.push('/people/page/' + page)
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
        this.setState({ filter: arg }, () => {
            axios.post('http://localhost:5000/people/filtered', this.state.filter)
                .then(response => {
                    console.log(response.data)
                    this.setState({ people: response.data })

                })
                .catch((error) => {
                    console.log(error);
                })
        });
    }


    render() {
        return (
            <>
                <SearchPeople setParentFilter={this.setFilter}></SearchPeople>
                <Pagination count={this.state.pageCount} defaultPage={parseInt(this.state.startPage)} onChange={this.changePage} color='primary'/>
                <div>
                    <div className="row">
                        {this.peopleList()}
                    </div>
                </div>
            </>
        )
    }
}