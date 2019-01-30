import React from 'react';


const SideNav = props => {

    return(
        <ul className='sidenav' style={props.open ? {transform: 'translateX(0%)'} : {transform: 'translateX(-105%)'} } >
            <li>
                <div className='user-view'>
                    <div className='background'>
                        <img src='img/ocean.jpg' />
                    </div>
                    {/* <a href="#user"><img className='circle' src='img/person1.jpg' /></a> */}
                    <a href="#name"><span className="white-text name">John Doe</span></a>
                    <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
                </div>
            </li>
            <li><a><i className="material-icons">work</i> Projects </a></li>
            <li><a><i className="material-icons">people</i> Users </a></li>
            <li><div className="divider"></div></li>
            <li><a className="waves-effect">Logout</a></li>
  
        </ul>
    )
}

export default SideNav;