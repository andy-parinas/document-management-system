import React from 'react';
import withStyles from 'react-jss';

import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';

const styles = {
    modal: {
        width: 1080,
    }
}

const ImageModal = props => {

    const {classes} = props;

    return(
        <div>
            <Modal isOpen={props.modal} toggle={props.toggle} size='lg' >
                <ModalHeader toggle={props.toggle}>Image Name</ModalHeader>
                <ModalBody>
                   <img style={{maxWidth: '100%'}}
                   src='https://firebasestorage.googleapis.com/v0/b/site-document.appspot.com/o/project1%2Ftask1%2Fproject_sitenum_sitename_0004.jpg?alt=media&token=2a2ed1fe-a20e-4859-b3f4-286c7fbce11d' />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={props.toggle}>Download</Button>{' '}
                    <Button color="secondary" onClick={props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )

}

export default withStyles(styles)(ImageModal);