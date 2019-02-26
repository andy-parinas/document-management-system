import React from 'react';

import {auth} from '../../config/Firebase';
import {AuthUserContext} from '../../config/context';
import SplashScreen from '../common/splash/SplashScreen';


const withAuthorization = Component => {

    class ComposedComponent extends React.Component {

        componentDidMount(){
            this.listener = auth.onAuthStateChanged(authUser => {
                if(!authUser){
                    this.props.history.push('/signin')
                }

                console.log('constructor', authUser.email)
            })
        }

        componentWillUnmount(){
            this.listener()
        }

        render(){

            return (
                <AuthUserContext.Consumer>
                    {authUser => authUser? <Component {...this.props} /> : <SplashScreen {...this.props} /> }
                </AuthUserContext.Consumer>


            )
        }


    }


    return ComposedComponent
}

export default withAuthorization;