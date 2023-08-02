import { Container, Navbar } from "react-bootstrap"

const Footer = () => {
  return (
    <Navbar expand='lg' bg="dark" data-bs-theme="dark">
      <Container>
       <h5 className="mx-auto">© 2023 CCAPDEV S18 Group 5, . All rights reserved.</h5>
      </Container>
    </Navbar>
  )
}

export default Footer