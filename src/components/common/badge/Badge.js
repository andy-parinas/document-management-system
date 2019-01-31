import React from 'react';
import withStyles from 'react-jss';

const styles = {
    root: {
        padding: {
            top: 1,
            right: 5,
            bottom: 1,
            left: 5
        },
        fontSize: '0.7rem',
        backgroundColor: '#424242',
        borderRadius: 5,
        color: '#fff',
        margin: {
            left: 10,
            right: 10
        }
    }
}

const Badge = props => {

    const {classes} = props;

    return (
        <div className={`z-depth-1 ${classes.root}`} >
            5 images
        </div>
    )
}

export default withStyles(styles)(Badge);