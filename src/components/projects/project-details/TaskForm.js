import React from 'react';
import withStyles from 'react-jss';

import {Modal, ModalHeader, ModalBody, Form, Label, Input, Row, Col, FormGroup, Button} from 'reactstrap';


class TaskForm extends React.Component {

    

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
                            <Input type="text"
                                name="name" id="name" 
                                placeholder="Enter Task Name" />
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }
}

export default TaskForm;