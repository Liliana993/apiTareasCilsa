import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router';
import Tabla from '../components/Tabla';
import '../App.css';


export default function Home(){
    return(
        <>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Tareas</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className='container-fluid p-2 home'>
        <Tabla />
      </Container>

        </>
    )
}