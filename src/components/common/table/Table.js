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


    state = {
        selected: []
    }


    handleCheckbox = (event) => {
        console.log('Checked', event.target.id, event.target.checked)
    }

    handleItemSelected = (event) => {
        const item = event.target.id;

        const {selected} = this.state;
        const selectedIndex = selected.indexOf(item);
        let newSelected = []

        if(selectedIndex === -1){
            newSelected = newSelected.concat(selected, item);
        }else if(selectedIndex === selected.length - 1){
            newSelected = newSelected.concat(selected.slice(0, -1))
        }else if(selectedIndex > 0){
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
        }

        this.setState({
            ...this.state,
            selected: newSelected
        })

    }

    handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        const newSelected = []

        if(isChecked){
            this.props.tableData.forEach(data => {
                newSelected.push((data.id).toString())
            })
        }

        console.log(newSelected);

        this.setState({
            ...this.state,
            selected: newSelected
        })
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1

    render(){
        
        console.log(this.state.selected);

        const {tableData, columns} = this.props;

        const rowData = tableData.map(data => {

            const row = columns.map(column => {

                return <td key={column.id} >{data[column.id]}</td>
            })

            const selected = this.isSelected((data.id).toString());

            return <tr key={Math.random()}>
                        <td>
                            <label>
                                <input id={data.id}  onChange={this.handleItemSelected} 
                                    className='filled-in' checked={selected}
                                     type="checkbox" /><span></span>
                            </label>
                        </td>
                        {row}
                    </tr>
        })

        return(
            <Fragment>
                <TableToolbar numSelected={this.state.selected.length} title={this.props.title} />
                <table className='stripped' >
                    <TableHead columns={this.props.columns}  onSelectAll={this.handleSelectAll}  />

                    <tbody>
                        { rowData }
                    </tbody>
                </table>
            </Fragment>
        )
    }


}

export default Table;