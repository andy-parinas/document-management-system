import {START_LOADING, END_LOADING, START_SUB_LOADING, END_SUB_LOADING, OPEN_SNACKBAR, CLOSE_SNACKBAR, START_TASK_LOADING, END_TASK_LOADING} from '../actions/actionTypes';

const initialState = {
    loading: false,
    subLoading: false,
    taskLoading: false,
    snackbar: null
}

const reducer = (state = initialState, action) => {

    switch(action.type){

        case START_LOADING:
            return {
                ...state,
                loading: true
            }
        
        case END_LOADING:
            return {
                ...state,
                loading: false
            }
        
        case START_SUB_LOADING:
            return {
                ...state,
                subLoading: true
            }
        
        case END_SUB_LOADING:
            return {
                ...state,
                subLoading: false
            }

        case START_TASK_LOADING:
            return {
                ...state,
                taskLoading: true
            }

        case END_TASK_LOADING: 
            return {
                ...state,
                taskLoading: false
            }
        
        case OPEN_SNACKBAR:
            return {
                ...state,
                snackbar: action.message
            }

        case CLOSE_SNACKBAR:
            return {
                ...state,
                snackbar: null
            }

        default:
            return state;
    }

}

export default reducer;