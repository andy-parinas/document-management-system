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
                    <label>
                        <input className='filled-in' type="checkbox" onChange={props.onSelectAll} /><span></span>
                    </label>
                </th>
                {columnHeaders}
            </tr>
        </thead>
    )


}

export default TableHead