import React from 'react';
import {connect} from 'react-redux';

import withStyles from 'react-jss';

import {Input, Button} from 'reactstrap'

import {searchProjects} from '../../store/actions/projectActions';


const styles = {
    searchGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: {
            bottom: 20
        }
    },
    searchInput: {
        width: '90%'
    }
}

class ProjectSearch extends React.Component{

    state ={
        search: ''
    }

    handleInputChange = event => {
        this.setState({
            ...this.state,
            search: event.target.value
        })
    }
   
    handleProjectSearch = () => {
        this.props.searchProject(this.state.search)
    }

    render(){
        const {classes} = this.props

        return (
            <div className={classes.searchGroup} >
            <Input type='text' placeholder='Search for Project' onChange={this.handleInputChange} /> 
            <Button onClick={this.handleProjectSearch} >Search</Button>
        </div>
        )
    }


}


const mapDispatchToProps = dispatch => {
    return {
        searchProject: (projectName) => dispatch(searchProjects(projectName))
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(ProjectSearch))

