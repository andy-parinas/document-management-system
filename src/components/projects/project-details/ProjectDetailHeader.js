import React, {Fragment} from 'react';
import withStyles from 'react-jss';

const styles = {
    detailGroup: {
        margin: {
            top: 20,
            bottom: 20
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
        <Fragment>
            <h5> {project.name} </h5>
            <div className={classes.detailGroup} >
                <div className={classes.detailItemGroup} >
                    <h6 className={`grey-text ${classes.detailItem} `} >Site Number: </h6>
                    <h6 className={`grey-text text-darken-1 ${classes.detailItem}`} > {project.siteNumber} </h6>
                </div>
                <div className={classes.detailItemGroup} >
                    <h6 className={`grey-text ${classes.detailItem} `} >Site Name: </h6>
                    <h6 className={`grey-text text-darken-1 ${classes.detailItem}`} > {project.siteName} </h6>
                </div>
                <div className={classes.detailItemGroup} >
                    <h6 className={`grey-text ${classes.detailItem} `} >Assigned To: </h6>
                    <h6 className={`grey-text text-darken-1 ${classes.detailItem}`} > {project.assignedToName} </h6>
                </div>
            </div>
        </Fragment>
    )

}

export default withStyles(styles)(ProjectDetailHeader);