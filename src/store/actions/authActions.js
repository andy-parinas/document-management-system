import React from 'react';

import {auth} from '../../config/Firebase'
import { AUTH_ERROR, AUTH_SUCCESS } from './actionTypes';

export const loginUser = (email, password, callback) => dispatch => {

    auth.signInWithEmailAndPassword(email, password).then(results => {

        dispatch({
            type: AUTH_SUCCESS
        })

        if(callback) callback();

    }).catch(error => {
        console.log(error.code);
        if(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' ){
            console.log('Dispatching actions on error')
            dispatch({
                type: AUTH_ERROR,
                authError: 'Invalid Username or Password'
            })
        }
    })


}

export const logoutUser = (callback) => dispatch => {
    auth.signOut().then(() => {
        
        console.log('User Logout')
        if(callback) callback();


    }).catch(error => {
        console.log('Error')
    })
}