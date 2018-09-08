import React, { Component } from 'react';
import './SearchComponent.css';

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    componentDidMount() {
        this.nameInput.focus();
    }
    
    handleChange = ((value) => {
        console.log(value);
        this.props.updateTable(value);
    })

    handleSubmit = ((event) => {
        event.preventDefault();
        this.props.updateTable(this.state.inputValue);
    })

    handleKeyPress = ((value) => {
        console.log("handleKeyUp called with event value " + value);
        this.props.updateTable(value);
    })

    render () {
        return (
            <div className="TableWrapper">
                <nav className="navbar navbar-light">
                    <form 
                        className="form-inline mx-auto">
                        <input 
                            ref={(input) => {this.nameInput = input}}
                            className="form-control mr-sm-2"
                            onKeyUp={(event) => {
                                this.handleChange(event.target.value)
                            }}
                            type="search" 
                            placeholder="Filter" 
                            aria-label="Filter"></input>
                    </form>
                </nav>
            </div>
        );
    }
}

export default SearchComponent;