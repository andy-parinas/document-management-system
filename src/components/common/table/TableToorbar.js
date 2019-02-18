import React from 'react';
import {Button} from 'reactstrap';

import withStyles from 'react-jss';


const styles = {
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        marginRight: '3px'
    }
}

const TableToolbar = props => {

    const {numSelected, title, classes} = props;

    let controls = '' 

    if(numSelected === 0 ){
        controls =  <div>
                        <Button onClick={() => props.onNewButtonClicked('new') }
                            className={classes.button} size="sm" color='primary' >  New Project </Button>
                        <Button onClick={props.onRefreshClicked} className={classes.button} size="sm" color='success'>  Refresh List </Button>
                    </div>
    }else if(numSelected >= 1){

        let addtionalControl = ''

        if(numSelected === 1){
            addtionalControl =  <React.Fragment>
                                    <Button onClick={props.onEditButtonClicked} 
                                        className={classes.button} size="sm" color='warning' > Edit </Button>
                                    <Button onClick={props.onCopyButtonClicked} 
                                        className={classes.button}  size="sm" color='info'> Copy </Button> 
                                </React.Fragment>
        }


        controls = <div>
                        { addtionalControl }
                        <Button onClick={props.onDeleteButtonClicked} className={classes.button} size="sm" color='danger' > Delete </Button>
                    </div>
    }

    let titleHeader = title;

    if(numSelected > 0){
        titleHeader = `${numSelected} items selected`
    }

    return(
        <div style={styles.toolbar} >
            <h5>{titleHeader}</h5>
            {controls}
        </div>
    )

}

export default withStyles(styles)(TableToolbar);