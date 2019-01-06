import React from 'react';
import './TableRow.css';

const TableRow = ((props) => {
    return (
        <tr>
            <td>{props.Date}</td>
            <td>{props.Title}</td>
            <td>
                <div 
                    className="LinkDiv"
                    dangerouslySetInnerHTML={{__html: props.Amazon_Links}}></div>
            </td>
        </tr>
    );
});

export default TableRow;