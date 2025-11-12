import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';



function Tabla() {
    const [todos, setTodos] = useState([]);

     useEffect(() => {
    axios.get('http://localhost:3003/todos')
      .then(res => setTodos(res.data))
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Descripción</th>
          <th>Completed</th>
          <th>Borrar/Editar</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => 
            <tr key={todo._id}>
          <td>{todo.title}</td>
          <td>{todo.description}</td>
          <td>{todo.completed? '🟢' : '🟡'}</td>
          <td className="d-grid gap-2">
            <Button variant='danger' type='submit' size='sm'>Borrar</Button>
            <Button variant='warning' type='submit' size='sm'>Editar</Button>
          </td>
        </tr>
        )}
      </tbody>
    </Table>
  );
}

export default Tabla;