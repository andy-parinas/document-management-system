import React from 'react';
import {connect} from 'react-redux';

import {loadProjects} from '../../store/actions/projectActions';
import Table from '../common/table/Table';

const columns = [
    {id: 'name', name: 'Project Name'},
    {id: 'assignedToName', name: 'Assigned To'},
    {id: 'status', name: 'Status'},
]

const data = [
    {id: 1, name: 'Project 1 with a Long Name', assignedToName: 'Sheldon Cooper'},
    {id: 2, name: 'Project 2', assignedToName: 'Howard Wollowitz'},
    {id: 3, name: 'Project 3', assignedToName: 'Leonard Hofstader'},
    {id: 4, name: 'Project 4', assignedToName: 'Rajesh Kutrapoli'}
]

class ProjectList extends React.Component{

    componentDidMount(){
        this.props.loadProjects();
    }

    handleShowProjectDetail = (id) => {
        this.props.history.push(`/projects/${id}`)
    }

    render(){
        return(
            <div className='container'>
                <div className='col s12'>
                    <div className='card'>
                        <div className='card-content'>
                            <Table columns={columns} 
                                onShowDetail={this.handleShowProjectDetail}
                                tableData={this.props.projects} 
                                title='Project List' />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects.projects
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadProjects: () => dispatch(loadProjects())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);