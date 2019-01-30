import { USER_LIST } from "../actions/actionTypes";

const initialState = {
    users: [],
    selectedUser: null
}

const reducer = (state = initialState, action) => {

    switch(action.type){

        case USER_LIST:
            return {
                ...state,
                users: action.users
            }

        default:
            return state;
    }


}

export default reducer;