import React from 'react';


const Navbar = props => {

    return (       
        <nav className='blue darken-4' >
            <div className='container'>
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo">Scriptum</a>
                    <a style={{cursor: 'pointer'}} onClick={props.onDrawerAction} 
                        className='button-collapse-show-on-large right'>
                        <i className='material-icons'>menu</i>
                    </a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down" style={{marginRight: '20px'}} >
                        <li><a href="#">Projects</a></li>
                        <li><a href="#">Users</a></li>
                    </ul>
                    
                </div>
            </div>
        </nav>    
    )
}

export default Navbar;