import React, {Fragment} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Navbar from '../layouts/navigations/Navbar';
import SideNav from '../layouts/navigations/SideNav';
import ProjectList from '../projects/ProjectList';
import ProjectDetail from '../projects/project-details/ProjectDetail';
import UserList from '../users/UserList';

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

        return(
            <Fragment>
                <Navbar onDrawerAction={this.handleDrawerActions} />
                <SideNav open={this.state.openSideNav} />
                <section className='section lighten-4'>
                   <Switch>
                       <Route path='/projects/all' component={ProjectList} />
                       <Route path='/projects/:id' component={ProjectDetail} />
                       <Route path='/users/all' component={UserList} />
                       <Redirect to='/projects/all' from='/' />
                   </Switch>
                </section>
            </Fragment>
        )
    }
}

export default Dashboard;