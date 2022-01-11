import React, { Component } from 'react';

export default class SearchPeople extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: {name: "-"}
        };
        this.search = this.search.bind(this);
        this.clearSearch = this.clearSearch.bind(this)
    }

    componentDidMount() {
        
    }


    search(event){
        event.preventDefault();
        let name = event.target.parentElement.querySelector('#name').value
        if (name === ""){
            name = "-"
        }
        this.setState(prevState => {
            let value = {...prevState.value}                    // creating copy of state variable value
            value["name"] = name     
            return { value };                                 // return new object value object
          }, () => this.props.setParentFilter(this.state.value))
    }

    clearSearch(event){
        event.preventDefault();
        let name = event.target.parentElement.querySelector('#name')
        name.value = ""
        this.setState(prevState => {
            let value = {...prevState.value}                    // creating copy of state variable value
            value["name"] = name.value     
            return { value };                                 // return new object value object
          }, () => this.props.setParentFilter(this.state.value))
    }

    render() {
        return (
            <form>
                <input type="text" id="name"></input>
                <button onClick={this.search}>Search</button>
                <button onClick={this.clearSearch}>Clear</button>
            </form>
        );
    }
}