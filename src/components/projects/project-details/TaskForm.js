import React from 'react';
import {connect} from 'react-redux';

import {Modal, ModalHeader, ModalBody, Form, Label, Input, Row, Col, FormGroup, Button} from 'reactstrap';
import PreLoaderBar from '../../common/preloader/PreLoaderBar';
import { addTask, getProjectTasks } from '../../../store/actions/projectActions';


class TaskForm extends React.Component {

    state = {
        data: {
            name: ''
        }
    }


    handleInputChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;

        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                [id]: value
            }
        })
    }

    handleTaskSave = () => {

        const task = {
            name: this.state.data.name,
            imageCount: 0,
            status: 'new'
        }

        this.props.addTask(this.props.projectId, task, () => {
            this.props.toggle();
            this.props.getProjectTasks(this.props.projectId);
        })

        console.log(task)
    }


    formSubmitHandler = (event) => {
        event.preventDefault();
    }


    render(){

        return(
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} >
                <ModalHeader toggle={this.props.toggle} >Add New Task</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.formSubmitHandler} >
                        <FormGroup>
                            <Input type="text" onChange={this.handleInputChange}
                                name="name" id="name" 
                                placeholder="Enter Task Name" />
                        </FormGroup>
                        <Button onClick={this.handleTaskSave} >Submit</Button>
                    </Form>
                </ModalBody>
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
        addTask: (projectId, task, callback ) => dispatch(addTask(projectId, task, callback)),
        getProjectTasks: (projectId) => dispatch(getProjectTasks(projectId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);