import React from 'react';
import {connect} from 'react-redux';


import {Modal, ModalHeader, ModalBody, Button, ModalFooter} from 'reactstrap';
import { deleteTask, getProjectTasks } from '../../../store/actions/projectActions';
import PreLoaderBar from '../../common/preloader/PreLoaderBar';


class TaskDeleteDialog extends React.Component {


    confirmDeleteHandler = () => {

        const {projectId, taskId} = this.props;

        this.props.deleteTask(projectId, taskId, () => {
            this.props.getProjectTasks(projectId);
            this.props.toggle();
        })
    }


    render(){

        return(
            <Modal isOpen={this.props.modal}  toggle={this.props.toggle} >
                <ModalHeader toggle={this.props.toggle}>Delete Task</ModalHeader>
                <ModalBody>
                    <div>Are you sure you want to delete </div> 
                    <div> <b>  {this.props.taskName} ?</b> </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.confirmDeleteHandler} >Confirm</Button>{ ' '}
                    <Button onClick={this.props.toggle} >Cancel</Button>
                </ModalFooter>
                <PreLoaderBar isLoading={this.props.loading} />
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        loading: state.utility.subLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteTask: (projectId, taskId, callback) => dispatch(deleteTask(projectId, taskId, callback)),
        getProjectTasks: (projectId) => dispatch(getProjectTasks(projectId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDeleteDialog);