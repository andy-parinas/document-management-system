import {TASK_DETAIL, TASK_ERROR} from '../actions/actionTypes';

const initialState = {
    task: null,
    error: null
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case TASK_DETAIL:
            return {
                ...state,
                task: action.task,
                error: null
            }
        
        case TASK_ERROR: 
            return {
                ...state,
                task: null,
                error: action.error
            }
        default:
            return state;
    }


}
export default reducer;