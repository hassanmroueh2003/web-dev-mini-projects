import { Modal, Button, Form } from 'react-bootstrap';

const AddItemModal = ({ show, onHide, newItem, setNewItem, handleAddItem }) => (
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formMonthName">
                    <Form.Label>Month Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter month name"
                        value={newItem.monthName}
                        onChange={(e) => setNewItem({ ...newItem, monthName: e.target.value })}
                    />
                </Form.Group>
                <Form.Group controlId="formItemName">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter item name"
                        value={newItem.itemName}
                        onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                    />
                </Form.Group>
                <Form.Group controlId="formItemData">
                    <Form.Label>Item Data (comma separated)</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter data (e.g. 1,2,3)"
                        value={newItem.itemData}
                        onChange={(e) => setNewItem({ ...newItem, itemData: e.target.value })}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={handleAddItem}>
                Add Item
            </Button>
        </Modal.Footer>
    </Modal>
);

export default AddItemModal;
