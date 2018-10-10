import React, { Component } from 'react';
import './ResultsTable.css';
import TableRow from './TableRow/TableRow'
import { Table } from 'reactstrap';
import logo from '../../logo.svg';

class ResultsTable extends Component {
    state = {
        message: ''
    }

    render () {
    
        return (
            <React.Fragment>
                <Table className="table table-responsive table-bordered" style={{}}>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Episode Title</th>
                            <th scope="col">Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((row, index) => {
                            return (
                                <TableRow 
                                    key={index}
                                    Date={row.Date}
                                    Title={row.Title}
                                    ID={row.ID}
                                    Amazon_Links={row.Amazon_Links}
                                />
                            )
                        })}
                        <TableRow />
                    </tbody>
                </Table>
                <footer className="">
                    <h5 style={{display: 'inline', fontWeight: '200'}}>Powered by React</h5>
                    <img style={{transform: 'translateY(-2px)'}}height="32px" src={logo}>
                    </img>
                </footer>
            </React.Fragment>
        )
    }
}

export default ResultsTable;