import React from 'react';


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
                        <li><a href="#">Projects</a></li>
                        <li><a href="#">Users</a></li>
                    </ul>
                    
                </div>
            </div>
        </nav>    
    )
}

export default Navbar;