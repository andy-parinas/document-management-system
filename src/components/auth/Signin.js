import React from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col, Form, FormGroup, Input, Button, Label, Card, CardBody, CardHeader, CardFooter, Alert} from 'reactstrap';
import withStyles from 'react-jss';
import { loginUser } from '../../store/actions/authActions';
import PreLoaderBar from '../common/preloader/PreLoaderBar';


const styles = {
    container: {
        margin: {
            top: 150,
            left: 'auto',
            right: 'auto'
        }
    },
    card: {
        // padding: 20
    },
    alert: {
        margin: {
            top: 5,
            bottom: 10
        }
    }
}


class Signin extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleInputChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value
        })
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        const {email, password} = this.state;
        this.props.signin(email, password, () => {
            this.props.history.push('/projects')
        })
    }

    render(){

        const {classes} = this.props;

        return(
            <Container className={classes.container} >
                <Row>
                    <Col md={{ size: 6, offset: 3 }}>
                        <Card className={classes.card}>
                            <CardHeader tag="h3" >Document Management System</CardHeader>
                            <CardBody>
                                { this.props.authError ? <Alert color="danger" className={classes.alert} > {this.props.authError} </Alert> : '' }
                                <Form onSubmit={this.formSubmitHandler}>
                                    <FormGroup>
                                        <Label for="exampleEmail">Email</Label>
                                        <Input type="email" name="email" id="email" onChange={this.handleInputChange}
                                            placeholder="Enter your Email Address" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="examplePassword">Password</Label>
                                        <Input type="password" name="password" id="password" onChange={this.handleInputChange}
                                            placeholder="Enter your Password" />
                                    </FormGroup>
                                    <Button> Sign In </Button>
                                </Form>
                            </CardBody>
                            <PreLoaderBar isLoading={this.props.loading} />
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

}

const mapStateToProps = state => {
    return {
        authError: state.auth.authError,
        loading: state.utility.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signin: (email, password, callback) => dispatch(loginUser(email, password, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Signin));