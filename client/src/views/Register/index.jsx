import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from '../../api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [isEmailTaken, setIsEmailTaken] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === 'username' || name === 'email') {
      validateField(name, value);
    }
  };

  const validateField = async (fieldName, value) => {
    try {
      const response = await axios.get(`/validate/${fieldName}/${value}`);
      if (fieldName === 'username') {
        setIsUsernameTaken(response.data.data);
      } else if (fieldName === 'email') {
        setIsEmailTaken(response.data.data);
      }
    } catch (error) {
      console.error('Error validating field:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to the backend API
      const response = await axios.post('/register', formData);

      // If the registration is successful, you can redirect the user to a different page
      // (You might want to handle this based on the response from the backend)
      if (response.status === 201) navigate(-1);
    } catch (error) {
      // Handle any errors that occur during the registration process
      console.error('Error registering user:', error);
    }
  };

  // Check if password and confirmPassword are the same
  const isPasswordMatch = formData.password === formData.confirmPassword;

  return (
    <>
      <Container className='justify-content-center align-items-center' style={{ height: '80vh' }}>
        <Container style={{ maxWidth: '60rem' }} className='mt-5'>
          <Form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' name='name' value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                name='username'
                value={formData.username}
                onChange={handleChange}
                isInvalid={isUsernameTaken}
              />
              <Form.Control.Feedback type='invalid'>
                Username is already taken.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                isInvalid={isEmailTaken}
              />
              <Form.Control.Feedback type='invalid'>
                Email is already taken.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type='submit' disabled={!isPasswordMatch}>
              Submit
            </Button>
          </Form>
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default Register;
