import React, {Fragment} from 'react';
import TableHead from './TableHead';
import { throws } from 'assert';
import TableToolbar from './TableToorbar';

import withStyle from 'react-jss';

import {Table, Card, CardHeader, CardBody, Button} from 'reactstrap';

const styles = {
    button: {
        marginRight: '5px'
    },
    checkbox: {
        display: 'flex',
        alignItems: 'center',
    },
    rowCheckbox: {
        // display: 'flex',
        // alignItems: 'flex-start',
        // justifyContent: 'center'
    },
    rowControl: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}



class StripedTable extends React.Component{


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

        this.setState({
            ...this.state,
            selected: newSelected
        })
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1

    render(){
        
        const {tableData, columns, classes} = this.props;

        const rowData = tableData.map(data => {

            const row = columns.map(column => <td key={column.id} >{data[column.id]}</td>)

            const selected = this.isSelected((data.id).toString());

            return <tr key={Math.random()}>
                        <td className={classes.rowCheckbox} >
                          <div>
                          <input id={data.id}  onChange={this.handleItemSelected}  checked={selected}
                                     type="checkbox" />
                          </div>
                        </td>
                        {row}
                        <td className={classes.rowControl} >
                            <Button 
                                onClick={() => this.props.onShowDetail(data.id)} size="sm">
                                Details >
                            </Button>
                        </td>
                    </tr>
        })

        return(
            <Card>
                <CardHeader>
                    <TableToolbar numSelected={this.state.selected.length} title={this.props.title} />
                </CardHeader>
                <CardBody>
                    <Table striped >
                        <TableHead columns={this.props.columns}  onSelectAll={this.handleSelectAll}  />
                        <tbody>
                            { rowData }
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        )
    }


}

export default withStyle(styles)(StripedTable);