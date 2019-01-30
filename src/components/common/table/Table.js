import React, {Fragment} from 'react';
import TableHead from './TableHead';
import { throws } from 'assert';
import TableToolbar from './TableToorbar';

const styles = {
    button: {
        marginRight: '5px'
    },
    checkbox: {
        display: 'flex',
        alignItems: 'center',
    }
}



class Table extends React.Component{


    handleCheckbox = (event) => {
        console.log('Checked', event.target.id, event.target.checked)
    }

    render(){
        
        const {tableData, columns} = this.props;

        const rowData = tableData.map(data => {

            const row = columns.map(column => {

                return <td key={column.id} >{data[column.id]}</td>
            })

            return <tr key={Math.random()}>
                        <td>
                            <label><input id={data.id} className='filled-in' onChange={this.handleCheckbox}
                                type="checkbox" /><span></span></label>
                        </td>
                        {row}
                    </tr>
        })

        return(
            <Fragment>
                <TableToolbar />
                <table className='stripped' >
                    <TableHead columns={this.props.columns} />

                    <tbody>
                        { rowData }
                    </tbody>
                </table>
            </Fragment>
        )
    }


}

export default Table;