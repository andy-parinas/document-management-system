import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import {Container, Card} from 'reactstrap';

import {getProject} from '../../../store/actions/projectActions';

import ProjectDetailTasks from './ProjectDetailTasks';
import ProjectDetailHeader from './ProjectDetailHeader';
import ProjectDetailControl from './ProjectDetailControl';
import PreLoader from '../../common/preloader/PreLoader';
import TaskForm from './TaskForm';
import TaskDeleteDialog from './TaskDeleteDialog';
import ProjectForm from '../ProjectForm';
import ProjectDeleteDialog from '../ProjectDeleteDialog';



//Temporary Data
const tasks = [
    {id: 1, name: 'High Power Amplifier'},
    {id: 2, name: 'FM Demodulator'},
    {id: 3, name: 'Antenna Feed'}
]


class ProjectDetail extends React.Component {

    state = {
        taskFormModal: false,
        deleteTaskModal: false,
        deleteProjectModal: false,
        projectFormModal: false,
        selectedTaskId: null,
        selectedTaskName: null,
        action: 'edit'
    }

    componentDidMount(){
        const id = this.props.match.params.id
        this.props.getProject(id);
    }

    toggleTaskForm = () => {
        this.setState(prevState =>({
            ...prevState,
            taskFormModal: !prevState.taskFormModal
        }))
    }

    toggleDeleteTask = (taskId, taskName) => {
       
        this.setState(prevState =>({
            ...prevState,
            deleteTaskModal: !prevState.deleteTaskModal,
            selectedTaskId: taskId,
            selectedTaskName: taskName
        }))
    }

    toggleDeleteProject = () => {
        this.setState(prevState =>({
            ...prevState,
            deleteProjectModal: !prevState.deleteProjectModal
        }))
    }

    toggleProjectForm = (action) => {
        this.setState(prevState =>({
            ...prevState,
            projectFormModal: !prevState.projectFormModal,
            action: action
        }))
    }

    handleTaskDetail = (taskId) => {

        const projectId = this.props.match.params.id;

        this.props.history.push(`/projects/${projectId}/task?id=${taskId}`)
    }

    editCallback = (projectId) => {
        this.props.getProject(projectId);
        this.toggleProjectForm();
    }

    copyCallback = (projectId) => {
        this.props.history.push(`/projects/${projectId}`)
        this.props.getProject(projectId);
        this.toggleProjectForm();
    }

    deleteCallback = () => {
        this.props.history.push('/projects');
        this.toggleDeleteProject();
    }

    render(){

        const {project, loading} = this.props;

        

        let projectDetails = <PreLoader />

        if(project !== null && !loading){
            projectDetails = (
               <React.Fragment>
                    <Card>
                        <ProjectDetailHeader project={project} />

                        <ProjectDetailTasks tasks={ project.tasks? project.tasks : null } onTaskDelete={this.toggleDelete}
                            onGetTaskDetail={this.handleTaskDetail} projectId={this.props.match.params.id} />

                        <ProjectDetailControl onAddTask={this.toggleTaskForm} 
                                onEditCopyProject={this.toggleProjectForm} 
                                onDeleteProject={this.toggleDeleteProject} />
                    </Card>
                    <TaskForm modal={this.state.taskFormModal} toggle={this.toggleTaskForm} projectId={this.props.match.params.id} />

                    <TaskDeleteDialog modal={this.state.deleteTaskModal} 
                        projectId={this.props.match.params.id}
                        toggle={this.toggleDeleteTask} 
                        taskId={this.state.selectedTaskId}
                        taskName={this.state.selectedTaskName} />

                    <ProjectForm
                        push={this.props.history.push}
                        project={this.props.project}
                        action={this.state.action} 
                        modal={this.state.projectFormModal} 
                        toggle={this.toggleProjectForm} 
                        editCallback={this.editCallback}
                        copyCallback={this.copyCallback} />

                    <ProjectDeleteDialog modal={this.state.deleteProjectModal}
                        toggle={this.toggleDeleteProject} projects={[this.props.project]}
                        deleteCallback={this.deleteCallback} />
               </React.Fragment>
            )
        }

        return(
            <Container className='container'>
              { projectDetails }
            </Container>
        )
    }

}

const mapStateToProps = state => {
    return {
        project: state.projects.project,
        loading: state.utility.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProject: (id) => dispatch(getProject(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);