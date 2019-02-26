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
                    <Button 
                        className={classes.button} 
                        size='sm' color='primary' onClick={props.onAddTask} >Add Task</Button>
                </div>
                <div className={classes.buttonGroup} >
                    <Button className={classes.button} size='sm' color='warning' onClick={() => props.onEditCopyProject('edit')} >Edit</Button>
                    <Button className={classes.button} size='sm' color='info' onClick={() => props.onEditCopyProject('copy')} >Copy</Button>
                    <Button className={classes.button} size='sm' color='danger' onClick={props.onDeleteProject} >Delete</Button>
                </div>

            </div>
        </CardFooter>
    )
}

export default withStyles(styles)(ProjectDetailControl);