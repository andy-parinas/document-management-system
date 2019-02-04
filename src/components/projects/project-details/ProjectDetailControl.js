import React from 'react';
import withStyles from 'react-jss';

import {CardFooter, Button} from 'reactstrap'

const styles = {
    button: {
        margin: {
            left: 2,
            right: 2
        }
    },
    buttonGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}


const ProjectDetailControl = props => {

    const {classes} = props;

    return(
        <CardFooter>
            <div className={classes.footer} >
                <div className={classes.buttonGroup} >
                    <Button className={classes.button} size='sm' color='primary' >New Task</Button>
                </div>
                <div className={classes.buttonGroup} >
                    <Button className={classes.button} size='sm' color='warning' >Edit</Button>
                    <Button className={classes.button} size='sm' color='info' >Copy</Button>
                    <Button className={classes.button} size='sm' color='danger' >Delete</Button>
                </div>

            </div>
        </CardFooter>
    )
}

export default withStyles(styles)(ProjectDetailControl);