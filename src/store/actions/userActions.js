import db from '../../config/Firebase';
import { USER_LIST } from './actionTypes';


export const loadUsers = () => dispatch => {

    const data = []

    console.log('Loading Users')
    
    db.collection('users').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const user = {
                id: doc.id,
                ...doc.data()
            }
            data.push(user)
        })

        dispatch({
            type: USER_LIST,
            users: data
        })

    }).catch(error => {
        console.log(error)
    })

}