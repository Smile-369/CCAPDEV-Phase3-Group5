import { Button, Container, Form } from 'react-bootstrap'

export const ContactUs = () => {
  return (
    <Container className="mx-10" style={{maxWidth: "40rem"}}>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea"/>
          </Form.Group>
          <Button type='submit' className='rounded mt-3'>Send</Button>
        </Form>
    </Container>
  )
}
