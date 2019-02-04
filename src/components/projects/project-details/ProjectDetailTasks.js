import React from 'react';
import withStyles from 'react-jss';

import {CardBody, CardTitle, ListGroup, ListGroupItem, Badge, Button} from 'reactstrap'



const styles = {
    itemTitle: {
        display: 'flex',
        alignItems: 'center'
    },
    itemGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    badge: {
        margin: {
            left: 5,
            right: 5
        }
    }
}



const ProjectDetailTasks = props => {

    const {classes, tasks} = props;

    const taskItems = tasks.map(task => {
        return  (
            <ListGroupItem> 
                <div className={classes.itemGroup} >
                    <div className={classes.itemTitle} >
                        {task.name} 
                        <Badge className={classes.badge} pill>14</Badge>
                        <Badge color="success">Complete</Badge>
                    </div>
                    <div>
                        <Button size='sm'> View </Button>
                    </div>
                </div>
            </ListGroupItem>
        )
    })

    let content = <h2> No Task Found </h2>

    if(tasks.length > 0 ){
        content = (
            <React.Fragment>
                <CardTitle> List of Tasks </CardTitle>
                <ListGroup>
                    {taskItems}
                </ListGroup>
            </React.Fragment>
        )
    }

    return(
        <CardBody>
            { content }
       </CardBody>
    )
}

export default withStyles(styles)(ProjectDetailTasks);