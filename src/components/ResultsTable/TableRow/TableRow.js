import React from 'react';
import './TableRow.css';

const TableRow = ((props) => {
    if ( window.canRunAds === undefined ) {
        return (
            <tr>
            <td>{props.Date}</td>
            <td>{props.Title}</td>
            <td>
                Disable your ad blocker to see links.
            </td>
        </tr>
        );
    } else {
        return (
        <tr>
            <td>{props.Date}</td>
            <td>{props.Title}</td>
            <td>
                <div 
                    className="LinkDiv"
                    dangerouslySetInnerHTML={{__html: props.Amazon_Links}}>
                </div>
            </td>
        </tr>
    );
    }
    
});

export default TableRow;