import React from 'react';
import {connect} from 'react-redux';

import {Container} from 'reactstrap';

import {loadProjects} from '../../store/actions/projectActions';
import {loadUsers} from '../../store/actions/userActions';

import Table from '../common/table/Table';
import PreLoader from '../common/preloader/PreLoader';
import ProjectForm from './ProjectForm';

const columns = [
    {id: 'name', name: 'Project Name'},
    {id: 'assignedToName', name: 'Assigned To'},
    {id: 'status', name: 'Status'},
]

class ProjectList extends React.Component{

    state = {
        modal: false,
        action: 'new',
        selectedProject: null
    }

    componentDidMount(){
        this.props.loadProjects();
    }

    handleShowProjectDetail = (id) => {
        this.props.history.push(`/projects/${id}`)
    }

    toggle = (action, actionObject) => {
        this.setState(prevState =>({
            ...prevState,
            modal: !prevState.modal
        }))
    }

    handleNewProject = () => {
        this.setState(prevState =>({
            ...prevState,
            modal: !prevState.modal,
            action: 'new'
        }))
    }

    handleEditProject = (selectedProject) => {
        this.setState(prevState =>({
            ...prevState,
            modal: !prevState.modal,
            action: 'edit',
            selectedObject: selectedProject
        }))
    }

    handleCopyProject = (selectedProject) => {
        this.setState(prevState =>({
            ...prevState,
            modal: !prevState.modal,
            action: 'copy',
            selectedProject: selectedProject
        }))
    }


    render(){
        console.log(this.state.formType)
        const {projects, loading} = this.props;

        let projectList = <PreLoader />

        if(projects.length > 0 && !loading){

            projectList = <Table columns={columns} 
                                onCopyButtonClicked={this.handleCopyProject}
                                onEditButtonClicked={this.handleEditProject}
                                onNewButtonClicked={this.handleNewProject}
                                onShowDetail={this.handleShowProjectDetail}
                                tableData={this.props.projects} 
                                title='Project List' />
        }

        return(
            <Container className='container'>
                <ProjectForm
                    push={this.props.history.push}
                    project={this.state.selectedProject}
                    action={this.state.action} 
                    modal={this.state.modal} 
                    toggle={this.toggle} />
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