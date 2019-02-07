import React from 'react';
import withStyles from 'react-jss';

import BarLoader from 'react-spinners/BarLoader';

const styles = {
    root: {
        width: '100%',
        margin: {
            top: 0,
            right: 'auto',
            bottom: 0,
            left: 'auto'
        }
    }
}

const PreLoaderBar = ({classes, isLoading}) => (
    <div className={classes.root} >
        <BarLoader color={'#80CBC4'} width={100} widthUnit='%'
          loading={isLoading} />
    </div>
)

export default withStyles(styles)(PreLoaderBar);