import React, {Fragment} from 'react';
import Navbar from '../layouts/navigations/Navbar';
import SideNav from '../layouts/navigations/SideNav';

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
            </Fragment>
        )
    }
}

export default Dashboard;