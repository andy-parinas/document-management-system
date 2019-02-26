import React, {Fragment} from 'react';
import {Switch, Route, Redirect, Link} from 'react-router-dom';
import withAuthorization from '../hoc/withAuthorization';

import {Breadcrumb, BreadcrumbItem} from 'reactstrap';

import withStyles from 'react-jss';

import Navbar from '../layouts/navigations/Navbar';
import SideNav from '../layouts/navigations/SideNav';
import ProjectList from '../projects/ProjectList';
import ProjectDetail from '../projects/project-details/ProjectDetail';
import UserList from '../users/UserList';
import ProjectTask from '../projects/project-task/ProjectTask';


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

    generateCrumbs = (crumbs) => {
        const breadCrumbs = crumbs.filter(crumb => crumb !== "");

        let link = ''

        const breadCrumbItems = breadCrumbs.map((crumb,index) => {

            let name = '';
            
            if(crumb === 'projects' || crumb === 'users' || crumb === 'tasks' || crumb == 'task'){
                name = crumb
            }else {
                name = 'details'
            }

            // name = crumb

            link =  link + '/' + crumb 

            if(index === breadCrumbs.length - 1 ){
                return <BreadcrumbItem key={crumb} >  {name}  </BreadcrumbItem>
            }else {
                return <BreadcrumbItem key={crumb}> 
                            <Link to={link} > {name} </Link>
                        </BreadcrumbItem>
            }
        })

        return breadCrumbItems;
    }

    render(){

        const crumbs = this.props.history.location.pathname.split('/')

        const {classes} = this.props
        return(
            <Fragment>
                <Navbar onDrawerAction={this.handleDrawerActions} />
                <div className={classes.breadCrumbs}>
                    <Breadcrumb>
                        { this.generateCrumbs(crumbs)}
                    </Breadcrumb>
                </div>
                <div className={classes.root} >
                    <Switch>
                        <Route path='/projects/:id/task' component={ProjectTask} />
                        <Route path='/projects/:id' component={ProjectDetail} />
                        <Route path='/projects' component={ProjectList} />
                        <Route path='/users' component={UserList} />
                        <Redirect to='/projects' from='/' />
                    </Switch>
                </div>
            </Fragment>
        )
    }
}

export default withAuthorization(withStyles(styles)(Dashboard));