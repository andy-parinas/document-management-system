import React from 'react';
import {connect} from 'react-redux';

import {Modal, ModalHeader, 
        ModalBody, ModalFooter, 
        Form, Label, Input, 
        Row, Col, Button, FormGroup} from 'reactstrap';

import {loadUsers} from '../../store/actions/userActions';
import { addProject, updateProject, copyProject } from '../../store/actions/projectActions';
import PreLoader from '../common/preloader/PreLoader';
import PreLoaderBar from '../common/preloader/PreLoaderBar';

class ProjectForm extends React.Component{

    state = {
        data: {
            id: null,
            name: '',
            siteNumber: '',
            siteName: '',
            assignedToId: '',
            status: 'new'
        }
    }


    static getDerivedStateFromProps(nextProps, prevState) {
      if(nextProps.project && nextProps.project.id !== prevState.data.id){

        const {project} = nextProps

            return {
                ...prevState,
                data: {
                    ...prevState.data,
                    id: project.id,
                    name: project.name,
                    siteNumber: project.siteNumber,
                    siteName: project.siteName,
                    assignedToId: project.assignedToId,
                    assignedToName: project.assignedToName,
                    status: project.status
                }
            }
      }

      return null;

    }


    componentDidMount(){
        this.props.loadUsers()
    }

   
    handleInputChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                [id]: value
            }
        })
    }

    handleProjectSave = () => {
        
        const selectedUser = this.props.users.find(user => user.id === this.state.data.assignedToId);

        if(this.props.action === 'new'){

            const project = {
                name: this.state.data.name,
                siteNumber: this.state.data.siteNumber,
                siteName: this.state.data.siteName,
                status: this.state.data.status,
                assignedToId: this.state.data.assignedToId,
                assignedToName: `${selectedUser.firstName} ${selectedUser.lastName}`,
                createdAt: Date.now(),
                updatedAt: Date.now()
            }
    
            this.props.addProject(project, (projectId)=>{
                this.props.push(`/projects/${projectId}`)
            })

        }else if(this.props.action === 'edit'){

            const project = {
                name: this.state.data.name,
                siteNumber: this.state.data.siteNumber,
                siteName: this.state.data.siteName,
                status: this.state.data.status,
                assignedToId: this.state.data.assignedToId,
                assignedToName: `${selectedUser.firstName} ${selectedUser.lastName}`,
                updatedAt: Date.now()
            }

            this.props.updateProject(this.props.project.id, project, this.props.editCallback)

        }else if(this.props.action === 'copy'){

            const project = {
                name: this.state.data.name,
                siteNumber: this.state.data.siteNumber,
                siteName: this.state.data.siteName,
                status: this.state.data.status,
                assignedToId: this.state.data.assignedToId,
                assignedToName: `${selectedUser.firstName} ${selectedUser.lastName}`,
                createdAt: Date.now(),
                updatedAt: Date.now()
            }

            this.props.copyProject(this.state.data.id, project, this.props.copyCallback)
        }
    }

    render(){

        const loader = <div>
                            Saving... <PreLoader />
                        </div>

        const userOptions = this.props.users.map(user => {
            return <option key={user.id} value={user.id} > {user.firstName} {user.lastName} </option>
        })

        let formTitle = ''
        if(this.props.action === 'new'){ 
            formTitle = 'Create Project'
        }
        else if(this.props.action === 'edit'){ 
            formTitle = 'Edit Project'
        }
        else if(this.props.action === 'copy' && this.props.project){
            formTitle = `Copy Project From ${this.props.project.name}`
        }

        return(
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} >
                <ModalHeader toggle={this.props.toggle} >
                    { formTitle }
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <Row form>
                            <Col>
                                <FormGroup>
                                    <Label for="name">Project Name</Label>
                                    <Input onChange={this.handleInputChange} type="text" value={this.state.data.name}
                                        name="name" id="name" 
                                        placeholder="Enter Project Name" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="siteNumber">Site Number</Label>
                                    <Input onChange={this.handleInputChange} type="text" value={this.state.data.siteNumber}
                                        name="siteNumber" id="siteNumber" 
                                        placeholder="Enter Site Number" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="siteName">Site Name</Label>
                                    <Input onChange={this.handleInputChange} type="text" value={this.state.data.siteName}
                                        name="siteName" id="siteName" placeholder="Enter Site Name" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="status">Status</Label>
                                    <Input disabled={this.props.action !== 'new'? false : true} onChange={this.handleInputChange} type="select"  value={this.state.data.status}
                                        name="status" id="status">
                                        <option value='new'>New</option>
                                        <option value='ongoing' >OnGoing</option>
                                        <option value='completed'>Completed</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="assignedTo">Assigned To</Label>
                                    <Input onChange={this.handleInputChange} type="select" name="assignedToId"  value={this.state.data.assignedToId}
                                        id="assignedToId">
                                        <option value='0'> -- Please Select -- </option>
                                        { userOptions }
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.handleProjectSave} color="primary">Save</Button>{' '}
                    <Button onClick={this.props.toggle} color="secondary">Cancel</Button>
                    
                </ModalFooter>
                <PreLoaderBar isLoading={this.props.loading} />
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        users: state.users.users,
        loading: state.utility.subLoading
    }
}

const mapDispatchToProp = dispatch => {
    return {
        loadUsers: () => dispatch(loadUsers()),
        addProject: (project, callback) => dispatch(addProject(project, callback)),
        updateProject: (id, updates, callback) => dispatch(updateProject(id, updates, callback)),
        copyProject: (sourceId, desProject, callback) => dispatch(copyProject(sourceId, desProject, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(ProjectForm);