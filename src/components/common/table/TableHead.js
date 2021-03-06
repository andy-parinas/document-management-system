import React from 'react';


const TableHead = props => {

    const {columns} = props;

    const columnHeaders = columns.map(column => {
       return (
        <th key={column.id} >
            {column.name}
        </th>
       )
    })

    return (
        <thead>
            <tr>
                <th>
                    <input type="checkbox" onChange={props.onSelectAll} />
                </th>
                {columnHeaders}
                <th></th>
            </tr>
        </thead>
    )


}

export default TableHead