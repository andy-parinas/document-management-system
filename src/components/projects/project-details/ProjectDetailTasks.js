import React from 'react';
import {connect} from 'react-redux';

import withStyles from 'react-jss';

import {CardBody, CardTitle, ListGroup, ListGroupItem, Badge, Button} from 'reactstrap'
import { getProjectTasks } from '../../../store/actions/projectActions';
import PreLoader from '../../common/preloader/PreLoader';



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



class ProjectDetailTasks extends React.Component {

    componentDidMount(){
        this.props.getProjectTasks(this.props.projectId)
    }

    render(){
        const {classes, tasks, projectId, projectTasks, loading} = this.props;

        let content = <PreLoader />
    
        if(!loading && projectTasks !== null){
            const taskItems = projectTasks.map(task => {
    
                let color = 'success';
                if(task.status !== 'complete') {
                    color = 'primary'
                }
        
                return  (
                    <ListGroupItem key={task.id} > 
                        <div className={classes.itemGroup} >
                            <div className={classes.itemTitle} >
                                {task.name} 
                                <Badge className={classes.badge} pill> {task.imageCount} </Badge>
                                <Badge color={color}> {task.status } </Badge>
                            </div>
                            <div>
                                <Button size='sm' color='success' onClick={() => this.props.onGetTaskDetail(task.id)} > View </Button> {' '}
                                <Button size='sm' color='warning' > Edit </Button> {' '}
                                <Button size='sm' color='danger' 
                                    onClick={() => this.props.onTaskDelete(task.id, task.name)} > Delete </Button>
                            </div>
                        </div>
                    </ListGroupItem>
                )
            })

            if(projectTasks.length > 0 ){
                content = (
                    <React.Fragment>
                        <CardTitle> List of Tasks </CardTitle>
                        <ListGroup>
                            {taskItems}
                        </ListGroup>
                    </React.Fragment>
                )
            }else {
                content = <h2>No Task Found</h2>
            }
        }
    
        return(
            <CardBody>
                { content }
           </CardBody>
        )
    }
}

const mapStateToProps = state => {
    return {
        projectTasks: state.projects.projectTasks,
        taskLoading: state.utility.taskLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProjectTasks: (projectId) => dispatch(getProjectTasks(projectId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProjectDetailTasks));