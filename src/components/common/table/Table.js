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

    handleEditButtonClicked = () => {
        const selectedObjectId = this.state.selected[0];
        const selectedObject = this.props.tableData.find(data => data.id === selectedObjectId)

        console.log('Table', selectedObject)

        this.props.onEditButtonClicked(selectedObject)
    }

    handleCopyButtonClicked = () => {
        const selectedObjectId = this.state.selected[0];
        const selectedObject = this.props.tableData.find(data => data.id === selectedObjectId)

        this.props.onCopyButtonClicked(selectedObject)
    }

    handleDeleteButtonClicked = () => {
        const selections = this.state.selected.map(selection => {
            return this.props.tableData.find(data => data.id === selection)
        })

        this.props.onDeleteButtonClicked(selections)
    }


    isSelected = id => this.state.selected.indexOf(id) !== -1

    render(){
        
        const {tableData, columns, classes} = this.props;

        let tableContent = <h2>No data found</h2>

        if(tableData.length > 0 ){
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

            tableContent = (
                <React.Fragment>
                     <Table striped >
                        <TableHead columns={this.props.columns}  onSelectAll={this.handleSelectAll}  />
                        <tbody>
                            { rowData }
                        </tbody>
                    </Table>
                    {
                        this.props.isEnd ? <h3>No more</h3> :  <Button onClick={this.props.onLoadMore} > Load More ... </Button>
                    }
                </React.Fragment>
            )

        }

        return(
            <Card>
                <CardHeader>
                    <TableToolbar 
                        onNewButtonClicked={this.props.onNewButtonClicked}
                        onEditButtonClicked={this.handleEditButtonClicked}
                        onCopyButtonClicked={this.handleCopyButtonClicked}
                        onDeleteButtonClicked={this.handleDeleteButtonClicked}
                        onRefreshClicked={this.props.onRefreshClicked}
                        numSelected={this.state.selected.length} 
                        title={this.props.title} />
                </CardHeader>
                <CardBody>
                    { tableContent }
                </CardBody>
                
                
            </Card>
        )
    }


}

export default withStyle(styles)(StripedTable);