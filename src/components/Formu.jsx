import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//import axios from 'axios';



function Formu() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todo, setTodo] = useState([]);

   useEffect(() => {
        fetch('http://localhost:3003/cursos')
            .then(response => response.json())
            .then(data => setTodo(data.data));
    }, []);

  const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3003/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, todo }),
        })
            .then(response => response.json())
            .then(data => {
                setTodo([...todo, data.data]);  // Añadir el nuevo curso a la lista
                setTitle('');
                setDescription('');  // Limpiar el campo del formulario
            });
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