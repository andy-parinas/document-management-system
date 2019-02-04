import React from 'react';
import {connect} from 'react-redux';

import {Container} from 'reactstrap';

import {loadProjects} from '../../store/actions/projectActions';
import Table from '../common/table/Table';
import PreLoader from '../common/preloader/PreLoader';
import ProjectForm from './ProjectForm';

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
        const {projects, loading} = this.props;

        let projectList = <PreLoader />

        if(projects.length > 0 && !loading){

            projectList = <Table columns={columns} 
                                onShowDetail={this.handleShowProjectDetail}
                                tableData={this.props.projects} 
                                title='Project List' />
        }

        return(
            <Container className='container'>

                <div>
                    { projectList }
                </div>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects.projects,
        loading: state.utility.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadProjects: () => dispatch(loadProjects())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);