import React from 'react';

import {Container, Row, Col, Form, FormGroup, Input, Button, Label, Card, CardBody, CardHeader} from 'reactstrap';
import withStyles from 'react-jss';


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
    }
}


class Signin extends React.Component{

    render(){

        const {classes} = this.props;

        return(
            <Container className={classes.container} >
                <Row>
                    <Col md={{ size: 6, offset: 3 }}>
                        <Card className={classes.card}>
                            <CardHeader tag="h3" >Document Management System</CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label for="exampleEmail">Email</Label>
                                        <Input type="email" name="email" id="exampleEmail" 
                                            placeholder="Enter your Email Address" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="examplePassword">Password</Label>
                                        <Input type="password" name="password" id="examplePassword" 
                                            placeholder="Enter your Password" />
                                    </FormGroup>
                                    <Button> Signin </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default withStyles(styles)(Signin);