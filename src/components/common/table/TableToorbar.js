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

    const {numSelected, title} = props;

    let controls = '' 

    if(numSelected === 0 ){
        controls =  <div>
                        <button style={styles.button} className="waves-effect btn-small grey ">
                            <i className='material-icons left' >refresh</i> refresh
                        </button>
                    </div>
    }else if(numSelected > 1){
        controls = <div>
                        <button style={styles.button} className="waves-effect btn-small grey ">
                            <i className='material-icons left' >delete</i> Delete
                        </button>
                    </div>
    }else if(numSelected === 1){
        controls =  <div>
                        <button style={styles.button} className="waves-effect btn-small grey ">
                            <i className='material-icons left' >edit</i> Edit
                        </button>
                        <button style={styles.button} className="waves-effect btn-small grey ">
                            <i className='material-icons left' >content_copy</i> Copy
                        </button>
                        <button style={styles.button} className="waves-effect btn-small grey ">
                            <i className='material-icons left' >delete</i> Delete
                        </button>
                    </div>
    }

    let titleHeader = title;

    if(numSelected > 0){
        titleHeader = `${numSelected} items selected`
    }

    return(
        <div style={styles.toolbar} >
            <h5>{titleHeader}</h5>
            {controls}
        </div>
    )

}

export default TableToolbar;