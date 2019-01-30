import React from 'react';

const styles = {
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        marginRight: '3px'
    }
}

const TableToolbar = props => {

    return(
        <div style={styles.toolbar} >
            <h5>Project List</h5>
           <div>
                <button style={styles.button} className="waves-effect btn-small grey ">
                    <i className='material-icons left' >edit</i> Edit
                </button>
                <button style={styles.button} className="waves-effect btn-small grey ">
                    <i className='material-icons left' >content_copy</i> Copy
                </button>
                <button style={styles.button} className="waves-effect btn-small grey ">
                    <i className='material-icons left' >delete</i> Delete
                </button>
                <button style={styles.button} className="waves-effect btn-small grey ">
                    <i className='material-icons left' >refresh</i> refresh
                </button>
           </div>
        </div>
    )

}

export default TableToolbar;