import { AUTH_SUCCESS, AUTH_ERROR } from "../actions/actionTypes";

const initialState = {
    authError: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case AUTH_SUCCESS:
            return {
                ...state,
                authError: null
            }
        
        case AUTH_ERROR:
            return {
                ...state,
                authError: action.authError
            }
        default:
            return state;
    }
}

export default reducer;