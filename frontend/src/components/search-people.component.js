import React, { Component } from 'react';
import axios from 'axios';

export default class SearchPeople extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: {name: "-"}
        };
        this.btnClick = this.btnClick.bind(this);
    }

    componentDidMount() {
        
    }


    btnClick(event){
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

    render() {
        return (
            <form onSubmit={this.handleSubmit} >
                <input type="text" id="name"></input>
                <button onClick={this.btnClick}>Search</button>
            </form>
        );
    }
}