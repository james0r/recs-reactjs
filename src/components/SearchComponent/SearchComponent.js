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

    render () {
        return (
            <div className="TableWrapper">
                <nav className="navbar navbar-light">
                    <form 
                        className="form-inline mx-auto">
                        <input 
                            ref={(input) => {this.nameInput = input}}
                            className="form-control mr-sm-2"
                            onKeyDown={(event) => {
                                event.key === 'Enter' ? event.preventDefault() : event;
                            }}
                            onKeyUp={(event) => {
                                event.key !== 'Enter' ? this.handleChange(event.target.value) : null;
                            }}
                            type="search" 
                            placeholder="Search" 
                            aria-label="Search"></input>
                    </form>
                </nav>
            </div>
        );
    }
}

export default SearchComponent;