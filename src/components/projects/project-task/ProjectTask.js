import React from 'react';
import {connect} from 'react-redux';

import {Container} from 'reactstrap';
import withStyles from 'react-jss';

import {getTask} from '../../../store/actions/projectActions';
import {searchParamsToObject} from '../../../utilities/utilities';

import PreLoader from '../../common/preloader/PreLoader';
import ImageModal from './ImageModal';
import ProjectTaskControl from './ProjectTaskControl';
import ProjectTaskContent from './ProjectTaskContent';


class ProjectTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          selectedImage: null
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
      toggle(image) {
        this.setState(prevState => ({
          modal: !prevState.modal,
          selectedImage: image
        }));
      }


    componentDidMount(){
        if(this.props.history.location && this.props.history.location.search){

            const search = searchParamsToObject(this.props.history.location.search)

            const projectId = this.props.match.params.id
            const taskId = search.id;

            this.props.getTask(projectId, taskId);
        }
    }

    render(){

        const {classes, task, loading, error} = this.props;

        let content = <PreLoader />

        if(task !== null && !loading){

            let images = <h4> No Images Found </h4>
            if(task.images.length > 0) {
                images = <ProjectTaskContent images={task.images} onImageClick={this.toggle} />
            }

            content =  <React.Fragment>
                            <ImageModal modal={this.state.modal} 
                                        toggle={this.toggle} image={this.state.selectedImage} />

                            <ProjectTaskControl toggle={this.toggle} 
                                taskName={task.name}/>    

                            { images }
                            
                        </React.Fragment>

        } else if(error !== null && !loading){

            content = <h3> {error} </h3>

        }

        return <Container> {content} </Container> 
    }

}

const mapStateToProps = state => {
    return {
        task: state.task.task,
        error: state.task.error,
        loading: state.utility.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTask: (projectId, taskId) => dispatch(getTask(projectId, taskId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTask);

