import React, {Fragment} from 'react';
import withStyles from 'react-jss';

import {CardHeader} from 'reactstrap';

const styles = {
    detailGroup: {
        margin: {
            top: 10,
            bottom: 10
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    detailItemGroup: {
        display: 'flex',
        alignItems: 'center'
    },
    detailItem: {
        margin: {
            right: 3,
            left: 3
        }
    }
}

const ProjectDetailHeader = props =>  {

    const {classes, project} = props;

    return(
        <CardHeader>
            <h5> {project.name} </h5>
            <div className={classes.detailGroup} >
                <div className={classes.detailItemGroup} >
                    <h6 className={`${classes.detailItem} `} >Site Number: </h6>
                    <h6 className={`${classes.detailItem}`} > {project.siteNumber} </h6>
                </div>
                <div className={classes.detailItemGroup} >
                    <h6 className={`${classes.detailItem} `} >Site Name: </h6>
                    <h6 className={`${classes.detailItem}`} > {project.siteName} </h6>
                </div>
                <div className={classes.detailItemGroup} >
                    <h6 className={`${classes.detailItem} `} >Assigned To: </h6>
                    <h6 className={`${classes.detailItem}`} > {project.assignedToName} </h6>
                </div>
            </div>
        </CardHeader>
    )

}

export default withStyles(styles)(ProjectDetailHeader);