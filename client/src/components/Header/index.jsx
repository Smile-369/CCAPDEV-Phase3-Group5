import { useState } from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import Login from "../LoginModal";

const Header = () => {
  const [show, setShow] = useState();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Navbar expand='lg' bg="dark" sticky="top" data-bs-theme="dark"> 
      <Container fluid>
        <Navbar.Brand href="#">Restaurant Review App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarId"/>
        <Navbar.Collapse id="navbarId" className="justify-content-end">
          <Nav>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#reviews">Reviews</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
            <Nav.Link onClick={handleShow}>Login</Nav.Link>
            <Login show={show} handleClose={handleClose}/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header