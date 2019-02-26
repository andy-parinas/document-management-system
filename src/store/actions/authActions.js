import React from 'react';

import {auth} from '../../config/Firebase'
import { AUTH_ERROR, AUTH_SUCCESS, START_LOADING, END_LOADING } from './actionTypes';

export const loginUser = (email, password, callback) => dispatch => {

    dispatch({
        type: START_LOADING
    })

    auth.signInWithEmailAndPassword(email, password).then(results => {

        dispatch({
            type: AUTH_SUCCESS
        })

        if(callback) callback();

        dispatch({
            type: END_LOADING
        })

    }).catch(error => {
        console.log('Signin Error', error.code);
        if(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' ){
            console.log('Dispatching actions on error')
            dispatch({
                type: AUTH_ERROR,
                authError: 'Invalid Username or Password'
            })

            dispatch({
                type: END_LOADING
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