import db from '../../config/Firebase';

import {PROJECT_LIST, ADD_PROJECT, PROJECT_DETAIL, 
    START_LOADING, END_LOADING, PROJECT_TASKS, START_SUB_LOADING, 
    END_SUB_LOADING, CLOSE_SNACKBAR, OPEN_SNACKBAR, TASK_ERROR, TASK_DETAIL, START_TASK_LOADING, END_TASK_LOADING} from './actionTypes'



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
                    ...doc.data()
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

    dispatch({
        type: START_SUB_LOADING
    })

    const projectRef = db.collection('projects').doc(id);

    console.log(projectRef)

    projectRef.update({
        ...updates
    }).then(() => {

        dispatch({
            type: END_SUB_LOADING
        })

        if(callback) callback();


    }).catch(error => {

        console.log(error)
        dispatch({
            type: END_SUB_LOADING
        })

    })

}

export const copyProject = (sourceId, desProject, callback) => dispatch => {

    dispatch({
        type: START_SUB_LOADING
    })


    const sourceRef = db.collection('projects').doc(sourceId);

    sourceRef.get().then(sourceDoc => {

        if(sourceDoc.exists){

            db.collection('projects').add(desProject).then(newProjeRef => {
               
                //Get the Tasks subcollection of the Source Project.
                sourceRef.collection('tasks').get().then(sourceTasks => {

                    //Check if the Tasks subcollection contains data.
                    if(sourceTasks.size > 0){
                        const batch = db.batch();

                        sourceTasks.forEach(task => {
                            const taskRef = newProjeRef.collection('tasks').doc();
                            const tempTask = {...task.data()};

                            batch.set(taskRef, {name: tempTask.name, imageCount: 0, status: 'new'})
                        })

                        batch.commit().then(() => {
                            //Completed creating a batch collection of Task.
                            //Actions needed for completed copying of project and tasks.
                            dispatch({
                                type: END_SUB_LOADING
                            })

                            if(callback) callback(newProjeRef.id)

                        }).catch(error => {
                            //Error in batch processing for creating tasks collection
                            dispatch({
                                type: END_SUB_LOADING
                            })

                            console.log('Error in batch Proessing', error)
                        })

                    }else {
                        //No Task Collection to be added
                        //Actions needed for the complete copying of project without tasks
                        dispatch({
                            type: END_SUB_LOADING
                        })

                        if(callback) callback(newProjeRef.id)
                    }

                }).catch(error => {
                    //Error in getting Task Subcollection of Source Project
                    dispatch({
                        type: END_SUB_LOADING
                    })

                    console.log('Error in Getting Task Subcollection', error)
                })

            }).catch(error => {
                //Error in Creating the new Project.
                //Action for error in creating project
                dispatch({
                    type: END_SUB_LOADING
                })
            })

        }


    }).catch(error => {
        //Error in getting source Refe

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
      
    dispatch({
        type: START_TASK_LOADING
    })

    const docRef = db.collection('projects').doc(id);

    docRef.collection('tasks').get().then(collections => {
      
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
            type: END_TASK_LOADING
        })



    }).catch(error => {
        console.log(error);

        dispatch({
            type: END_TASK_LOADING
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


export const addTask = (projectId, task, callback) => dispatch => {

      
    dispatch({
        type: START_SUB_LOADING
    })

    const projectRef = db.collection('projects').doc(projectId)
    
    projectRef.get().then(projectDoc => {

        if(projectDoc.exists){

            projectRef.collection('tasks').add(task).then(taskRef => {

                  
                dispatch({
                    type: END_SUB_LOADING
                })

               //Actions for successfull creation of tasks.
               if(callback) callback();

            }).catch(error => {
                //Error creating Task in project collection
                dispatch({
                    type: END_SUB_LOADING
                })

                console.log('Error Adding Task', error);
            })


        }else {

            dispatch({
                type: END_SUB_LOADING
            })

            console.log('Project Does not Exist')

        }

    }).catch(error => {
        //Error Getting Project
        dispatch({
            type: END_SUB_LOADING
        })

        console.log('Error Getting Project', error)
    })


}

export const closeSnackbar = () => dispatch => {
    dispatch({
        type: CLOSE_SNACKBAR
    })
}
