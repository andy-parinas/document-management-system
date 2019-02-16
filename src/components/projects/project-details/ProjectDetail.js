import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import {Container, Card} from 'reactstrap';

import {getProject} from '../../../store/actions/projectActions';

import ProjectDetailTasks from './ProjectDetailTasks';
import ProjectDetailHeader from './ProjectDetailHeader';
import ProjectDetailControl from './ProjectDetailControl';
import PreLoader from '../../common/preloader/PreLoader';
import TaskForm from './TaskForm';



//Temporary Data
const tasks = [
    {id: 1, name: 'High Power Amplifier'},
    {id: 2, name: 'FM Demodulator'},
    {id: 3, name: 'Antenna Feed'}
]


class ProjectDetail extends React.Component {

    state={
        modal: false
    }

    componentDidMount(){
        const id = this.props.match.params.id
        this.props.getProject(id);
    }

    toggle = () => {
        this.setState(prevState =>({
            ...prevState,
            modal: !prevState.modal
        }))
    }

    handleTaskDetail = (taskId) => {

        const projectId = this.props.match.params.id;

        this.props.history.push(`/projects/${projectId}/task?id=${taskId}`)
    }

    render(){

        const {project, loading} = this.props;

        

        let projectDetails = <PreLoader />

        if(project !== null && !loading){
            projectDetails = (
               <React.Fragment>
                    <Card>
                        <ProjectDetailHeader project={project} />

                        <ProjectDetailTasks tasks={ project.tasks? project.tasks : null } 
                            onGetTaskDetail={this.handleTaskDetail} projectId={this.props.match.params.id} />

                        <ProjectDetailControl onAddTask={this.toggle}  />
                    </Card>
                    <TaskForm modal={this.state.modal} toggle={this.toggle} projectId={this.props.match.params.id} />
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