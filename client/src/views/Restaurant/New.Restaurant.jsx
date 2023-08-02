import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from '../../api';
import useAuth from '../../hooks/useAuth';

const NewRestaurant = () => {
	const { auth, setAuth } = useAuth();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		userId: auth._id,
		name: '',
		bio: '',
		profile: '',
	});

	const [isUsernameTaken, setIsUsernameTaken] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));

		if (name === 'name') {
			validateField(name, value);
		}
	};

	const validateField = async (fieldName, value) => {
		try {
			const response = await axios.get(
				`/restaurant/validate/${fieldName}/${value}`
			);
			if (fieldName === 'name') {
				setIsUsernameTaken(response.data.data);
			}
		} catch (error) {
			console.error('Error validating field:', error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Send the form data to the backend API
			console.log(formData);
			const response = await axios.post('/restaurant/register', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			// If the registration is successful, you can redirect the user to a different page
			// (You might want to handle this based on the response from the backend)
			if (response.status === 201) {
				setAuth((prev) => {
					return { ...prev, isOwner: true };
				});
				navigate(-1);
			}
		} catch (error) {
			// Handle any errors that occur during the registration process
			console.error('Error registering user:', error);
		}
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
			setFormData({ ...formData, profile: file });
		} else {
			// Optionally handle invalid file type here, e.g., show an error message to the user
		}
	};

	return (
		<>
			<Container
				className='justify-content-center align-items-center'
				style={{ height: '80vh' }}
			>
				<Container style={{ maxWidth: '60rem' }} className='mt-5'>
					<Form onSubmit={handleSubmit}>
						<h2>Create Restaurant</h2>
						<Form.Group className='mb-5'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								name='name'
								value={formData.name}
								onChange={handleChange}
								isInvalid={isUsernameTaken}
							/>
							<Form.Control.Feedback type='invalid'>
								Restaurant name is already taken.
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-5'>
							<Form.Label>Bio</Form.Label>
							<Form.Control
								type='text'
								name='bio'
								value={formData.bio}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Control
								type='file'
								accept='.png, .jpg, .jpeg'
								name='profile'
								onChange={handleFileChange}
							/>
						</Form.Group>
						<Button type='submit'>Submit</Button>
					</Form>
				</Container>
			</Container>
			<Footer />
		</>
	);
};

export default NewRestaurant;
