import React from 'react';
import withStyles from 'react-jss';
import Badge from '../../common/badge/Badge';


const styles = {
    itemTitle: {
        display: 'flex',
        alignItems: 'start'
    },
    itemGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}



const ProjectDetailTasks = props => {

    const {classes, tasks} = props;

    const taskItems = tasks.map(task => {
        return  <li className='collection-item'>
                   <div className={classes.itemGroup}>
                   <div className={classes.itemTitle} >
                        <label>
                            <input className='filled-in'
                                type="checkbox" /><span></span>
                        </label>
                        <div>{task.name}</div> 
                        <Badge />
                    </div>
                    <div>
                        <button className='waves-effect btn-small'>Send</button>
                    </div>
                   </div>
                </li>
    })

    return(
        <ul  className='collection with-header'>
            <li className='collection-header' ><h6>Task List</h6></li>
            { taskItems }
       </ul>
    )
}

export default withStyles(styles)(ProjectDetailTasks);