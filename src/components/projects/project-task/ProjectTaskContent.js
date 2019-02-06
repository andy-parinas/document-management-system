import React from 'react';
import withStyles from 'react-jss';

import {Row, Col, Card, CardImg, CardBody, CardTitle} from 'reactstrap';


const styles = {
    checkbox: {
        margin: {
            right: 10
        }
    },
    title: {
        display: 'flex',
        alignItems: 'center'
    },
    column: {
        margin: {
            bottom: 10
        }
    },
    image: {
        cursor: 'pointer'
    }
}


const ProjectTaskContent = props => {

    const {classes} = props;

    const content = props.images.map(image => {
        return (     
            <Col xs='4' className={classes.column} >
                <Card>
                    <CardImg top width='100%' 
                        onClick={() => props.onImageClick(image)}  
                        className={classes.image} 
                        src={image.url} />
                    <CardBody>
                        <CardTitle>
                            <div className={classes.title} >
                                <input className={classes.checkbox} type='checkbox' />
                                { image.name }
                            </div>
                        </CardTitle>
                    </CardBody>
                </Card>
            </Col>
        )
    })

    const rowContent = []

    while(content.length){
        const row = <Row> { content.splice(0, 3) } </Row>
        rowContent.push(row);
    }

    return(
        <React.Fragment>
            {rowContent }
        </React.Fragment>
    )

}

export default withStyles(styles)(ProjectTaskContent);
