import React from 'react';
import withStyles from 'react-jss';

import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';

const styles = {
    modal: {
        width: 1080,
    }
}

const ImageModal = props => {

    const {classes, image} = props;

    return(
        <div>
            <Modal isOpen={props.modal} toggle={props.toggle} size='lg' >
                <ModalHeader toggle={props.toggle}> { image !== null? image.name : ''} </ModalHeader>
                <ModalBody>
                   <img style={{maxWidth: '100%'}}
                   src={ image !== null? image.url : ''} />
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