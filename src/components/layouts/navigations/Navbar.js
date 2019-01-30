import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = props => {

    return (       
        <nav className='teal darken-2' >
            <div className='container'>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">Scriptum</a>
                    <a style={{cursor: 'pointer'}} onClick={props.onDrawerAction} 
                        className='button-collapse-show-on-large right'>
                        <i className='material-icons'>menu</i>
                    </a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down" style={{marginRight: '20px'}} >
                        <li><NavLink to='/projects/all' >Projects</NavLink></li>
                        <li><NavLink to='/users/all' >Users</NavLink></li>
                    </ul>
                    
                </div>
            </div>
        </nav>    
    )
}

export default Navbar;