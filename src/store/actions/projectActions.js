import db from '../../config/Firebase';

import {PROJECT_LIST, ADD_PROJECT, PROJECT_DETAIL, 
    START_LOADING, END_LOADING, PROJECT_TASKS, START_SUB_LOADING, 
    END_SUB_LOADING, CLOSE_SNACKBAR, OPEN_SNACKBAR, TASK_ERROR, TASK_DETAIL} from './actionTypes'



export const loadProjects = () => dispatch => {

    const data = []

    dispatch({
        type: START_LOADING
    })

    db.collection("projects").get().then(querySnapshot => {

        querySnapshot.forEach((doc) => {
            const document = {
                id: doc.id,
                ...doc.data()
            }
            data.push(document);
        });

        dispatch({
            type: PROJECT_LIST,
            projects: data
        })

        dispatch({
            type: END_LOADING
        })

    }).catch(error => {
        console.log(error)

        dispatch({
            type: END_LOADING
        })

    })
}

export const addProject = (project, callback) => dispatch => {

    dispatch({
        type: START_SUB_LOADING
    })

    db.collection('projects').add(project).then(docRef => {

        docRef.get().then(documentSnapshot => {
            
            dispatch({
                type: END_SUB_LOADING
            })

            dispatch({
                type: OPEN_SNACKBAR,
                message: 'Project Successfully Created'
            })

            if(callback) callback(documentSnapshot.id);

        })

    }).catch(error => {
        console.log(error)

        dispatch({
            type: END_SUB_LOADING
        })
    })
}


export const getProject =(id) => dispatch => {

    dispatch({
        type: START_LOADING
    })

    const docref = db.collection('projects').doc(id);

    docref.get().then(doc => {

        if(doc.exists){

            const tasks = []

            docref.collection('tasks').get().then(collections => {
                
                if(collections.size > 0){
                    collections.forEach(task => {
    
                        const taskObject = {
                            id: task.id,
                            ...task.data()
                        }
            
                        tasks.push(taskObject)
            
                    })
                }

                const project = {
                    id: doc.id,
                    ...doc.data(),
                    tasks: tasks
                }

                dispatch({
                    type: PROJECT_DETAIL,
                    project: project
                })


                dispatch({
                    type: END_LOADING
                })


            })

        }else {
            dispatch({
                type: PROJECT_DETAIL,
                project: null
            })
        }

    }).catch(error => {
        console.log(error);

        dispatch({
            type: END_LOADING
        })
    })




}

export const updateProject = (id, updates, callback) => (dispatch, getState) => {

    const tasks = getState().projects.project.tasks

    dispatch({
        type: START_SUB_LOADING
    })

    db.collection('projects').doc(id).set({
        ...updates
    }).then(result => {

        const project = {
            id: id,
            ...updates,
            tasks: tasks
        }

        dispatch({
            type: PROJECT_DETAIL,
            project: project
        })

        dispatch({
            type: END_SUB_LOADING
        })

        dispatch({
            type: OPEN_SNACKBAR,
            message: 'Project Successfully Updated'
        })

        if(callback) callback();

    }).catch(error => {
        console.log(error)
        dispatch({
            type: END_SUB_LOADING
        })

    })

}

export const deleteProjects = (projects, callback) => dispatch => {

    dispatch({
        type: START_SUB_LOADING
    })

    const batch = db.batch();

    projects.forEach(project => {
        const ref = db.collection('projects').doc(project.id);
        batch.delete(ref)
    })

    batch.commit().then(() => {
        console.log('Projects Deleted')

        dispatch({
            type: END_SUB_LOADING
        })

        if(callback){
            callback('success', 'Projects Successfully Deleted')
        }


        console.log(typeof callback)
    
    }).catch(err => {
        console.log(err);
        dispatch({
            type: END_SUB_LOADING
        })

        
        if(callback){
            callback('error', 'Error deleting projects')
        }
    })
}

export const getProjectTasks = (id) => dispatch => {

    const docRef = db.collection('projects').doc(id);

    docRef.collection('tasks').get().then(collections => {
        
        dispatch({
            type: START_SUB_LOADING
        })


        const data = [];
        
        if(collections.size > 0){
            collections.forEach(collection => {
            
                const task = {
                    id: collection.id,
                    ...collection.data()
                }
    
                data.push(task)
    
            })
        }

        dispatch({
            type: PROJECT_TASKS,
            tasks: data
        })
        

        dispatch({
            type: END_SUB_LOADING
        })



    }).catch(error => {
        console.log(error);

        dispatch({
            type: END_SUB_LOADING
        })

    })

}


export const getTask = (projectId, taskId) => dispatch => {
    
    dispatch({
        type: START_LOADING
    })

    const projectRef = db.collection('projects').doc(projectId);

    const taskRef = projectRef.collection('tasks').doc(taskId)

    taskRef.get().then(doc => {

        const images = [];
        
        if(doc.exists){ //Document Exist

            taskRef.collection('images').get().then(collections => {

                //Get the collection of images if there are.
                if(collections.size > 0 ){
                    collections.forEach(collection => {
                        const image = {
                            id: collection.id,
                            ...collection.data()
                        }

                        images.push(image);
                    })
                }

                const task = {
                    id: doc.id,
                    ...doc.data(),
                    images: images
                }

                dispatch({
                    type: TASK_DETAIL,
                    task: task
                })

                dispatch({
                    type: END_LOADING
                })
    

            })


        }else { //Document Don't Exist

            console.log('Document Dont Exist')

            dispatch({
                type: END_LOADING
            })

            dispatch({
                type: TASK_ERROR,
                error: 'Task Not Found'
            })
        }

    }).catch(err => { //Error getting task Document

        dispatch({
            type: END_LOADING
        })

        dispatch({
            type: TASK_ERROR,
            error: 'Error Getting Task'
        })

        console.log(err);
    })
}

export const closeSnackbar = () => dispatch => {
    dispatch({
        type: CLOSE_SNACKBAR
    })
}
