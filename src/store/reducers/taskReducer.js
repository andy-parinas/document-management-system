import {TASK_DETAIL} from '../actions/actionTypes';

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
        default:
            return state;
    }


}
export default reducer;