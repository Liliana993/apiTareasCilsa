import { Container, Navbar } from "react-bootstrap"
import Formu from "../components/Formu";

export default function CreateTask(){
    return(
        <>
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>Tareas</Navbar.Brand>
            </Container>
          
        </Navbar>

        <Container>

        <Formu />
        </Container>
        </>
    )
}