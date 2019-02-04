import React, {Fragment} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {Breadcrumb, BreadcrumbItem} from 'reactstrap';

import withStyles from 'react-jss';

import Navbar from '../layouts/navigations/Navbar';
import SideNav from '../layouts/navigations/SideNav';
import ProjectList from '../projects/ProjectList';
import ProjectDetail from '../projects/project-details/ProjectDetail';
import UserList from '../users/UserList';


const styles = {
    root: {
        margin: {
            top: 50,
            bottom: 50
        }
    },
    breadCrumbs: {

    }
}

class Dashboard extends React.Component {

    state = {
        openSideNav: false
    }

    handleDrawerActions = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                openSideNav: !prevState.openSideNav
            }
        })
    }

    render(){

        console.log(this.props.history.location.pathname.split('/'))

        const {classes} = this.props
        return(
            <Fragment>
                <Navbar onDrawerAction={this.handleDrawerActions} />
                <div className={classes.breadCrumbs}>
                    <Breadcrumb>
                        <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                        <BreadcrumbItem><a href="#">Library</a></BreadcrumbItem>
                        <BreadcrumbItem active>Data</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className={classes.root} >
                    <Switch>
                        <Route path='/projects/all' component={ProjectList} />
                        <Route path='/projects/:id' component={ProjectDetail} />
                        <Route path='/users/all' component={UserList} />
                        <Redirect to='/projects/all' from='/' />
                        <Redirect to='/projects/all' from='/projects' />
                    </Switch>
                </div>
            </Fragment>
        )
    }
}

export default withStyles(styles)(Dashboard);