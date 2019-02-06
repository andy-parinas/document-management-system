import React from 'react';
import {Button} from 'reactstrap';
import withStyles from 'react-jss';

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

const ProjectTaskControl = props => {

    const {classes, taskName, projectName} = props;

    return(
        <div className={classes.control} >
            <div className={classes.title} >
                <h4> {taskName} </h4>
                <div>
                    <Button onClick={props.toggle} color='primary' className={classes.button} size='sm'>Download</Button>
                    <Button color='danger' className={classes.button} size='sm'>Delete</Button>
                    <Button color='success' className={classes.button} size='sm'>Refresh</Button>
                </div>
            </div>
            <div className={classes.subTitle} >
                <h6> {projectName} </h6>
            </div>
        </div>
    )

}

export default withStyles(styles)(ProjectTaskControl);