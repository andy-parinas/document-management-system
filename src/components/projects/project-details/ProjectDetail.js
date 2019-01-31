import React from 'react';
import ProjectDetailTasks from './ProjectDetailTasks';
import ProjectDetailHeader from './ProjectDetailHeader';
import ProjectDetailControl from './ProjectDetailControl';



//Temporary Data
const tasks = [
    {id: 1, name: 'High Power Amplifier'},
    {id: 2, name: 'FM Demodulator'},
    {id: 3, name: 'Antenna Feed'}
]


class ProjectDetail extends React.Component {

    render(){

        return(
            <div className='container'>
                <div className='col s12'>
                    <div className='card'>
                        <div className='card-content'>   
                            
                            <ProjectDetailHeader />

                            <ProjectDetailTasks tasks={tasks} />
                            
                            <ProjectDetailControl />

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProjectDetail;