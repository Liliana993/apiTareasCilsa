import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router';
import Tabla from '../components/Tabla';

export default function Home(){
    return(
        <>
        <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Tareas</Navbar.Brand>
          <Link></Link>
          <Nav className="me-auto">
            <Link to="/crear">Crear</Link>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <Tabla />
      </Container>

        </>
    )
}