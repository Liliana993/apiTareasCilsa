import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Formu from './Formu';

function Modale({setTodos}) {
  const [show, setShow] = useState(false);
  //const [todos, setTodos] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Button className='m-2 nueva' onClick={handleShow}>
        Crear tarea
      </Button>

      <Modal show={show} onHide={handleShow}>
        <Modal.Header>
          <Modal.Title>Nueva tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formu setTodos={setTodos} onSuccess={handleClose}></Formu>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modale;