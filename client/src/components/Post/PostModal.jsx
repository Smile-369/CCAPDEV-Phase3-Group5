import { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import axios from '../../api';
import useRestaurant from '../../hooks/useRestaurant';

// eslint-disable-next-line react/prop-types
const PostModal = ({ show, handleClose, onSubmit }) => {
	const { auth } = useAuth();
	const { restaurants } = useRestaurant();
	const [formData, setFormData] = useState({
		userId: auth._id,
		restaurantId: '',
		title: '',
		content: '',
		rating: '',
		upvote: [],
		downvote: [],
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('/new/post', formData);
			if (response.status === 201) onSubmit(response.data.data);
		} catch (err) {
			console.error(err);
		}
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleOnClose = () => {
		setFormData({
			restaurantId: '',
			title: '',
			content: '',
			rating: '',
			upvote: [],
			downvote: [],
		});
		handleClose();
	};
	
	return (
		<Modal show={show} onHide={handleOnClose}>
			<Modal.Header closeButton>Create</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Title'
							className='rounded mb-2'
							name='title'
							required
							value={formData.title}
							onChange={handleInputChange}
						/>
					</Form.Group>
					<Row>
						<Form.Group as={Col} className='mr-2'>
							<Form.Control
								as='select'
								className='rounded mb-2'
								name='restaurantId'
								value={formData.restaurantId}
								required
								onChange={handleInputChange}
							>
								<option value='' disabled>
									Select a Restaurant
								</option>
								{restaurants.map((restaurant) => (
									<option key={restaurant._id} value={restaurant._id}>
										{restaurant.name}
									</option>
								))}
							</Form.Control>
						</Form.Group>
						<Form.Group as={Col} xs={4} className='mr-2'>
							<Form.Control
								type='number'
								placeholder='Ratings'
								name='rating'
								className='rounded mb-2'
								min={0}
								max={5}
								step={0.1}
								value={formData.rating}
								onChange={handleInputChange}
								required
							/>
						</Form.Group>
					</Row>
					<Form.Group>
						<Form.Control
							as='textarea'
							name='content'
							value={formData.content}
							onChange={handleInputChange}
							required
						/>
					</Form.Group>
					<Button className='mt-2' type='submit'>
						Submit
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default PostModal;
