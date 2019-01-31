import React from 'react';
import withStyles from 'react-jss';

const styles = {
    button: {
        marginRight: 5
    },
    buttonGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: {
            top: 50
        }
    }
}


const ProjectDetailControl = props => {

    const {classes} = props;

    return(
        <div className={classes.buttonGroup} >
            <button style={styles.button} className="waves-effect btn-small blue-grey darken-0 ">
                <i className='material-icons left' >edit</i> Edit
            </button>
            <button style={styles.button} className="waves-effect btn-small blue-grey darken-0 ">
                <i className='material-icons left' >content_copy</i> Copy
            </button>
            <button style={styles.button} className="waves-effect btn-small blue-grey darken-0 ">
                <i className='material-icons left' >delete</i> Delete
            </button>
        </div>
    )
}

export default withStyles(styles)(ProjectDetailControl);