import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmationModal = ({ show, onHide, itemToDelete, deleteItem }) => (
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete the item `{itemToDelete?.itemName}` from `{itemToDelete?.monthName}`?
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Cancel
            </Button>
            <Button variant="danger" onClick={deleteItem}>
                Delete
            </Button>
        </Modal.Footer>
    </Modal>
);

export default DeleteConfirmationModal;
