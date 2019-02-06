import React from 'react';
import {connect} from 'react-redux';

import {Container, Row, Col, Card, CardImg, CardBody, CardTitle, Button} from 'reactstrap';
import withStyles from 'react-jss';

import {getTask} from '../../../store/actions/projectActions';
import {searchParamsToObject} from '../../../utilities/utilities';



const styles = {
    control: {
        backgroundColor: '#F5F5F5',
        border: '1px solid #EEEEEE',
        padding: {
            top: 10,
            right: 15,
            bottom: 5,
            left: 15
        },
        borderRadius: 5,
        margin: {
            bottom: 20
        }
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: {
            bottom: 5
        }
    },
    subTitle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        margin: {
            left: 2,
            right: 2
        }
    }
}





class ProjectTask extends React.Component {


    componentDidMount(){
        if(this.props.history.location && this.props.history.location.search){

            const search = searchParamsToObject(this.props.history.location.search)

            const projectId = this.props.match.params.id
            const taskId = search.id;

            this.props.getTask(projectId, taskId);
        }
    }

    render(){

        const {classes} = this.props;

        return(
            <Container>
                <div className={classes.control} >
                    <div className={classes.title} >
                        <h4>Task Name</h4>
                        <div>
                            <Button color='primary' className={classes.button} size='sm'>Download</Button>
                            <Button color='danger' className={classes.button} size='sm'>Delete</Button>
                            <Button color='success' className={classes.button} size='sm'>Refresh</Button>
                        </div>
                    </div>
                    <div className={classes.subTitle} >
                        <h6>Project Name</h6>
                    </div>
                </div>
                <Row>
                    <Col>
                        <Card>
                            <CardImg top width='100%' 
                            src="https://firebasestorage.googleapis.com/v0/b/site-document.appspot.com/o/project1%2Ftask1%2Fproject_sitenum_sitename_0004.jpg?alt=media&token=2a2ed1fe-a20e-4859-b3f4-286c7fbce11d" />
                            <CardBody>
                                <CardTitle>
                                    <input type='checkbox' />
                                    Image Name
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardImg top width='100%' 
                            src="https://firebasestorage.googleapis.com/v0/b/site-document.appspot.com/o/project1%2Ftask1%2Fproject_sitenum_sitename_0004.jpg?alt=media&token=2a2ed1fe-a20e-4859-b3f4-286c7fbce11d" />
                            <CardBody>
                                <CardTitle>
                                    <input type='checkbox' />
                                    Image Name
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardImg top width='100%' 
                            src="https://firebasestorage.googleapis.com/v0/b/site-document.appspot.com/o/project1%2Ftask1%2Fproject_sitenum_sitename_0004.jpg?alt=media&token=2a2ed1fe-a20e-4859-b3f4-286c7fbce11d" />
                            <CardBody>
                                <CardTitle>
                                    <input type='checkbox' />
                                    Image Name
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        getTask: (projectId, taskId) => dispatch(getTask(projectId, taskId))
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(ProjectTask));

