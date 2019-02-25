import React from 'react';
import {connect} from 'react-redux';
import {Container} from 'reactstrap';

import {loadProjects, searchProjects} from '../../store/actions/projectActions';
import {loadUsers} from '../../store/actions/userActions';

import Table from '../common/table/Table';
import PreLoader from '../common/preloader/PreLoader';
import ProjectForm from './ProjectForm';
import ProjectDeleteDialog from './ProjectDeleteDialog';
import ProjectSearch from './ProjectSearch';
import PreLoaderBar from '../common/preloader/PreLoaderBar';

import {Button} from 'reactstrap';


const columns = [
    {id: 'name', name: 'Project Name'},
    {id: 'assignedToName', name: 'Assigned To'},
    {id: 'status', name: 'Status'},
]

class ProjectList extends React.Component{

    state = {
        modal: false,
        delete: false,
        action: 'new',
        selectedProject: null,
        selectedProjects: []
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

    
    toggleDelete = () => {
        this.setState(prevState =>({
            ...prevState,
            delete: !prevState.delete
        }))
    }

    handleNewProject = () => {

        const initializeProject = {
            id: 0,
            name: '',
            siteNumber: '',
            siteName: '',
            assignedToId: '',
            status: 'new'
        }
        this.setState(prevState =>({
            ...prevState,
            modal: !prevState.modal,
            action: 'new',
            selectedProject: initializeProject
        }))
    }

    handleEditProject = (selectedProject) => {
        this.setState(prevState =>({
            ...prevState,
            modal: !prevState.modal,
            action: 'edit',
            selectedProject: selectedProject
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

    handleDeleteProject = (selectedProjects) => {

        this.setState(prevState =>({
            ...prevState,
            delete: !prevState.delete,
            selectedProjects: selectedProjects
        }))
    }


    render(){

        const {projects, loading} = this.props;

        let projectList = <PreLoader />

        if(projects.length > 0 && !loading){

            projectList = <Table columns={columns} 
                                onCopyButtonClicked={this.handleCopyProject}
                                onEditButtonClicked={this.handleEditProject}
                                onNewButtonClicked={this.handleNewProject}
                                onDeleteButtonClicked={this.handleDeleteProject}
                                onShowDetail={this.handleShowProjectDetail}
                                onRefreshClicked={this.props.loadProjects}
                                tableData={this.props.projects} 
                                title='Project List' />
        }else if(projects.length === 0 && !loading){
            projectList = <h2> No Projects Found </h2>
        }

        return(
            <Container className='container'>
                <ProjectSearch />
                <div>
                    { projectList }
                </div>
                <ProjectDeleteDialog modal={this.state.delete}
                    toggle={this.toggleDelete} projects={this.state.selectedProjects} />
                <ProjectForm
                    push={this.props.history.push}
                    project={this.state.selectedProject}
                    action={this.state.action} 
                    modal={this.state.modal} 
                    toggle={this.toggle} />
                <PreLoaderBar isLoading={this.props.subLoading} />
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects.projects,
        loading: state.utility.loading,
        subLoading: state.utility.subLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadProjects: () => dispatch(loadProjects())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);