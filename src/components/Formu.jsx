import axios from 'axios';
import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//import axios from 'axios';



function Formu({setTodos, onSuccess }) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async(e) => {
        e.preventDefault();
        try {
          const res = await axios.post("http://localhost:3003/todos", {
      title,
      description
    });

     //console.log("RESPUESTA POST =>", res.data);

    // Actualiza automáticamente la tabla
        const newTask = res.data.todo;
        setTodos((prev) => [...prev, newTask]);

      // Cerrar el modal
      if (onSuccess) onSuccess();

    // Limpiar inputs
    setTitle("");
    setDescription("");

        } catch (error) {
          console.log('Ha ocurrido un error al crear la tarea: ', error)
        }
    };

  return (
    <Container>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Titulo</Form.Label>
        <Form.Control type="text" placeholder="title" value={title} onChange={(e)=> setTitle(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Descripción</Form.Label>
        <Form.Control type='text' placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)} />
        <Button variant='primary' type='submit'>Guardar</Button>
      </Form.Group>
    </Form>
   
    </Container>
    
  );
}

export default Formu;