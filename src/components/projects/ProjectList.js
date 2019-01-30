import React from 'react';
import Table from '../common/table/Table';

const columns = [
    {id: 'name', name: 'Project Name'},
    {id: 'assignedToName', name: 'Assigned To'}
]

const data = [
    {id: 1, name: 'Project 1 with a Long Name', assignedToName: 'Sheldon Cooper'},
    {id: 2, name: 'Project 2', assignedToName: 'Howard Wollowitz'},
    {id: 3, name: 'Project 3', assignedToName: 'Leonard Hofstader'},
    {id: 4, name: 'Project 4', assignedToName: 'Rajesh Kutrapoli'}
]

class ProjectList extends React.Component{

    render(){
        return(
            <div className='container'>
                <div className='col s12'>
                    <div className='card'>
                        <div className='card-content'>
                            <Table columns={columns} tableData={data} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default ProjectList;