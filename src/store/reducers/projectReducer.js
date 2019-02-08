import {PROJECT_LIST, PROJECT_DETAIL, PROJECT_TASKS, DELETE_PROJECT} from '../actions/actionTypes'

const initialState = {
    projects: [],
    project: null,
    projectTasks: [],
    messagetype: null,
    message: null
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case PROJECT_LIST:
            return {
                ...state,
                projects: action.projects
            }
        case PROJECT_DETAIL:
            return {
                ...state,
                project: action.project
            }

        case PROJECT_TASKS:
            return {
                ...state,
                projectTasks: action.tasks
            }

        default:
            return state
    }



}

export default reducer;