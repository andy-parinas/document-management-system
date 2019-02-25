import {PROJECT_LIST, PROJECT_DETAIL, PROJECT_TASKS, DELETE_PROJECT, PROJECT_LOAD_MORE} from '../actions/actionTypes'

const initialState = {
    projects: [],
    project: null,
    projectTasks: null,
    messagetype: null,
    message: null,
    isEnd: false,
    lastDoc: null
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case PROJECT_LIST:
            return {
                ...state,
                projects: action.projects,
                lastDoc: action.lastDoc,
                isEnd: false
            }
        case PROJECT_DETAIL:
            return {
                ...state,
                project: action.project
            }

        case PROJECT_LOAD_MORE:
            // console.log('Reducer State', state)
            return {
                ...state,
                projects: [...state.projects, ...action.projects],
                lastDoc: action.lastDoc,
                isEnd: action.isEnd
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