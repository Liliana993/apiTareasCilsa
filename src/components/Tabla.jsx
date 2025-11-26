import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modale from './Modale';
import { Container, Modal } from 'react-bootstrap';
import {FaTrashCan} from "react-icons/fa6";
import {FaPen} from 'react-icons/fa6';
import Swal from "sweetalert2";


function Tabla() {
    const [todos, setTodos] = useState([]);
     const [showModal, setShowModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState({
      _id: '',
      title: '',
      description: ''
    })

     // 👉 Abrir modal con la data de la tarea seleccionada
  const handleOpenModal = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  // 👉 Cerrar modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

     useEffect(() => {
    fetchTasks()
  }, []);

   const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3003/todos')
      setTodos(response.data)
    } catch (error) {
      console.error('Error fetching tareas:', error)
    }
  }

    // 🔸 Función para borrar tarea
   const handleDelete = async (_id) => {

    const result = await Swal.fire({
    title: "¿Eliminar tarea?",
    text: "Esta acción no se puede revertir",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  });

  if (!result.isConfirmed) return;
       try {
    await axios.delete(`http://localhost:3003/todos/${_id}`);

    // Vuelve a pedir la lista actualizada
    const res = await axios.get("http://localhost:3003/todos");
    setTodos(res.data);
    Swal.fire("Eliminada", "La tarea fue eliminada correctamente", "success");

  } catch (error) {
    console.error("Error deleting course:", error);
    Swal.fire("Error", "No se pudo eliminar", "error");
  } // Maneja cualquier error durante la solicitud
    };

    // 🔸 Función para editar tarea
   const handleUpdate = async () => {
    try {
      const {_id, title, description} = selectedTodo;
      await axios.put(`http://localhost:3003/todos/${_id}`,{
        title,
        description
      });
      
      //refresco la tabla
      setTodos(prev => prev.map(t => (t._id === _id ?{...t, title, description} : t )));

      // Mensaje SweetAlert2
    Swal.fire({
      icon: "success",
      title: "¡Tarea editada!",
      text: "Los cambios se guardaron correctamente.",
      showConfirmButton: false,
      timer: 1800
    });

      //nuestro modal
      setShowModal(false);
    } catch (error) {
      console.log('Ha ocurrido un error al actualizar la tarea: ', error);
      //mensaje de error
      Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo actualizar la tarea.",
    });
    }
  };

  return (
    <Container>
    <Modale setTodos={setTodos}  />
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Descripción</th>
          <th>Fecha/Hora</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => 
            <tr key={todo._id}>
          <td>{todo.title}</td>
          <td>{todo.description}</td>
          <td>{new Date(todo.createdAt).toLocaleString()}</td>
          <td className="d-grid gap-2">
            <Button variant='danger' type='submit' size='sm' onClick={() => handleDelete(todo._id)}>Borrar <FaTrashCan/> </Button>
            <Button className='editar' type='submit' size='sm' onClick={() => handleOpenModal(todo)}>Editar <FaPen/></Button>
          </td>
        </tr>
        )}
      </tbody>
    </Table>
   
   {/* MODAL EDITAR */}
      <Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Editar tarea</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <label className="fw-bold">Título</label>
    <input
      className="form-control mb-3"
      value={selectedTodo.title}
      onChange={(e) =>
        setSelectedTodo({ ...selectedTodo, title: e.target.value })
      }
    />

    <label className="fw-bold">Descripción</label>
    <textarea
      className="form-control"
      value={selectedTodo.description}
      onChange={(e) =>
        setSelectedTodo({ ...selectedTodo, description: e.target.value })
      }
    />
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Cancelar
    </Button>
    <Button variant="primary" onClick={handleUpdate}>
      Guardar cambios
    </Button>
  </Modal.Footer>
</Modal>

     
    </Container>
  );
}

export default Tabla;