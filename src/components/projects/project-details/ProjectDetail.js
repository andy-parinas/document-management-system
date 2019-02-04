import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import {Container, Card} from 'reactstrap';

import {getProject} from '../../../store/actions/projectActions';

import ProjectDetailTasks from './ProjectDetailTasks';
import ProjectDetailHeader from './ProjectDetailHeader';
import ProjectDetailControl from './ProjectDetailControl';
import PreLoader from '../../common/preloader/PreLoader';



//Temporary Data
const tasks = [
    {id: 1, name: 'High Power Amplifier'},
    {id: 2, name: 'FM Demodulator'},
    {id: 3, name: 'Antenna Feed'}
]


class ProjectDetail extends React.Component {

    componentDidMount(){
        const id = this.props.match.params.id
        this.props.getProject(id);
    }

    render(){

        const {project, loading} = this.props;

        let projectDetails = <PreLoader />

        if(project !== null && !loading){
            projectDetails = (
                <Card>
                    <ProjectDetailHeader project={project} />

                    <ProjectDetailTasks tasks={tasks} />

                    <ProjectDetailControl />
                </Card>
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