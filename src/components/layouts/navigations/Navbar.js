import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import withStyles from 'react-jss';

import {Button, 
    Navbar, 
    NavbarToggler,
    NavbarBrand, 
    Container, 
    Collapse, 
    Nav, 
    NavItem, 
    NavLink as StrapNavlink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem} from 'reactstrap';
import { logoutUser } from '../../../store/actions/authActions';


const styles = {
    root: {
        color: '#fff'
    },
    navlink: {
        '&:focus': {
            outline: 'none'
        }
    }
}

class NavigationBar extends React.Component {

    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    

    render(){
        const {classes} = this.props;

        return (
            <div className={classes.root} >
                <Navbar color="dark" dark expand="md">
                    <Container>
                        <NavbarBrand>DMS</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className='ml-auto' navbar>
                                <NavItem>
                                <NavLink className={`nav-link ${classes.navlink}`} to='/projects'>Project</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={`nav-link ${classes.navlink}`}  to='/users'>Users</NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret className={classes.navlink} >
                                        {this.props.email}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            Profile
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={this.props.logout}>
                                            Logout
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        
                        </Collapse>
    
                    </Container>
                </Navbar>
            </div>       
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        logout: () => dispatch(logoutUser())
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(NavigationBar));