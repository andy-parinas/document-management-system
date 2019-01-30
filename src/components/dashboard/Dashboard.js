import React, {Fragment} from 'react';
import Navbar from '../layouts/navigations/Navbar';
import SideNav from '../layouts/navigations/SideNav';
import ProjectList from '../projects/ProjectList';

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
                   <ProjectList />
                </section>
            </Fragment>
        )
    }
}

export default Dashboard;