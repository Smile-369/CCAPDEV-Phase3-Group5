/* eslint-disable react/prop-types */
import { Button, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import axios from '../../api';

const Login = ({ show, handleClose }) => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	const { setAuth } = useAuth();
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await axios.get('/login', { params: formData });
		const user = response.data.data;
		setAuth({
			_id: user._id,
			username: user.username,
			name: user.name,
			profile: user.profile,
			meta: user.meta,
			isOwner: user.isOwner,
		});
		handleClose();
		navigate('/dashboard');
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>LOGIN</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Username</Form.Label>
						<Form.Control
							type='text'
							name='username'
							value={formData.username}
							onChange={handleChange}
						/>
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
					<p>
						doesn&apos;t have an account? <Link to='/register'>Click here</Link>{' '}
					</p>
					<Button className='mt-2' type='submit'>
						Submit
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default Login;
