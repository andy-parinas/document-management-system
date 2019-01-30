import React from 'react';
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


class ProjectDetail extends React.Component {

    render(){
        const {classes} = this.props;

        return(
            <div className='container'>
                <div className='col s12'>
                    <div className='card'>
                        <div className='card-content'>   
                            <h5> Project Name </h5>
                            <div className={classes.detailGroup} >
                                <div className={classes.detailItemGroup} >
                                    <h6 className={`grey-text ${classes.detailItem} `} >Site Number: </h6>
                                    <h6 className={`grey-text text-darken-1 ${classes.detailItem}`} >QLD-SP-20190101</h6>
                                </div>
                                <div className={classes.detailItemGroup} >
                                    <h6 className={`grey-text ${classes.detailItem} `} >Site Name: </h6>
                                    <h6 className={`grey-text text-darken-1 ${classes.detailItem}`} >SouthPort QLD</h6>
                                </div>
                                <div className={classes.detailItemGroup} >
                                    <h6 className={`grey-text ${classes.detailItem} `} >Assigned To: </h6>
                                    <h6 className={`grey-text text-darken-1 ${classes.detailItem}`} >Adolfo Parinas</h6>
                                </div>
                            </div>

    
                            <ul class="collection with-header">
                                <li class="collection-header"><h6>Task List</h6></li>
                                <li class="collection-item">
                                    <div>Task Number 12131
                                        <a href="#!" class="secondary-content"><i class="material-icons">send</i></a>
                                    </div>
                                </li>
                                <li class="collection-item">
                                    <div>Task Number 23123
                                        <a href="#!" class="secondary-content"><i class="material-icons">send</i></a>
                                    </div>
                                </li>
                                <li class="collection-item">
                                    <div>Task Number 54521
                                        <a href="#!" class="secondary-content"><i class="material-icons">send</i></a>
                                    </div>
                                </li>
                                <li class="collection-item">
                                    <div>Task Number 52411
                                        <a href="#!" class="secondary-content"><i class="material-icons">send</i></a>
                                    </div>
                                </li>
                                <li class="collection-item">
                                    <div>Task Number 131231 <span className="new badge">4</span>
                                        <a href="#!" class="secondary-content"><i class="material-icons">send</i></a>
                                    </div>
                                </li>
                               
                               </ul>
            

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withStyles(styles)(ProjectDetail);