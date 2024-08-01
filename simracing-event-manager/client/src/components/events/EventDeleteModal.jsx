import { Button, Modal } from 'react-bootstrap';

export default function EventDeleteModal({showModal, hideModal, modalData}) {
    return(
        <Modal className="modal_accept" show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete {modalData.name} ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>id: {modalData.id}</Modal.Body>
        <Modal.Footer>
            <Button variant="success" onClick={hideModal}>
                    Yes
            </Button>
            <Button variant="danger" onClick={hideModal}>
                    No
            </Button>
        </Modal.Footer>
    </Modal>
    );
}