import React, {Fragment} from 'react';
import {connect} from 'react-redux';

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
                <Fragment>
                    <ProjectDetailHeader project={project} />

                    <ProjectDetailTasks tasks={tasks} />

                    <ProjectDetailControl />
                </Fragment>
            )
        }

        return(
            <div className='container'>
                <div className='col s12'>
                    <div className='card'>
                        <div className='card-content' >   
                            <div>
                            { projectDetails }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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