import React from 'react';
import withStyles from 'react-jss';

import FadeLoader from 'react-spinners/FadeLoader';

const styles = {
    root: {
        width: 100,
        margin: {
            top: 0,
            right: 'auto',
            bottom: 0,
            left: 'auto'
        }
    }
}

const PreLoader = ({classes}) => (
    <div className={classes.root}>
        <FadeLoader color={'#80CBC4'}
          loading={true} />
    </div>
)

export default withStyles(styles)(PreLoader);