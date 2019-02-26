import React from 'react';
import {connect} from 'react-redux';

import withStyles from 'react-jss';

import {Modal,Alert, ModalHeader, ModalBody, ModalFooter, 
        Button, ListGroup, ListGroupItem} from 'reactstrap';

import { deleteProjects, loadProjects } from '../../store/actions/projectActions';
import PreLoaderBar from '../common/preloader/PreLoaderBar';


const styles = {
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    allert: {
        fontSize: 14
    },
    error: {
        color: 'red'
    },
    success: {
        color: 'green'
    }
}


class ProjectDeleteDialog extends React.Component {

    state = {
        results: null,
        message: ''
    }


    handleDeleteProject = () => {

        this.props.deleteProjects(this.props.projects, (results, message) => {
            this.setState({
                ...this.state,
                results: results,
                message: message
            })

        })
    }

    handleSuccessfullDelete = () => {
       this.props.deleteCallback();
    }


    render(){

        const {classes} = this.props;

        const projects = this.props.projects.map(project => {
            return <ListGroupItem> {project.name} </ListGroupItem>
        })

        let message = ''
        let buttons = <div>
                        <Button onClick={this.handleDeleteProject} color='danger' > Confirm </Button> {' '}
                        <Button onClick={this.props.toggle} > Cancel </Button>
                    </div>

        if(this.state.results === 'success'){
            message = <span className={classes.success} > {this.state.message} </span>
            buttons =   <div>
                            <Button color='primary' onClick={this.handleSuccessfullDelete} > OK </Button>
                        </div>
        }else if(this.state.results === 'error'){
            message = <span className={classes.error} > {this.state.message} </span>
        }

        return(
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} >
                <ModalHeader toggle={this.props.toggle} >
                    Delete The Following Projects?
                </ModalHeader>
                <ModalBody>
                    <ListGroup>
                        { projects }
                    </ListGroup>
                </ModalBody>
                <ModalFooter className={classes.footer} >
                    <div  className={classes.allert} >
                        { message }
                    </div>
                    {buttons}
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

const mapDispatchToprops = dispatch => {
    return {
        deleteProjects: (projects, callback) => dispatch(deleteProjects(projects, callback)),
        loadProjects: () => dispatch(loadProjects())
    }
}

export default connect(mapStateToProps, mapDispatchToprops)(withStyles(styles)(ProjectDeleteDialog));