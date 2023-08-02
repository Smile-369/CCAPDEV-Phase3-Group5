/* eslint-disable react/prop-types */
import { Button, Modal, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from '../../api';

const EditPost = ({ show, onSubmit, onClose, postId }) => {
	const [formData, setFormData] = useState({
		title: '',
		content: '',
	});

	useEffect(() => {
		const fetchReview = async () => {
			try {
				const response = await axios.get(`/review/postId/${postId}`);
				console.log(response);
				const { title, content } = response.data.data;
				setFormData({ title, content });
			} catch (err) {
				console.error(err);
			}
		};
		if (show) {
			fetchReview();
		}
	}, [postId, show]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(
				`/review/edit/postId/${postId}`,
				formData
			);
			if (response.status === 200) {
				onSubmit(response.data.data);
				onClose();
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleOnClose = () => {
		onClose();
	};

	return (
		<Modal show={show} onHide={handleOnClose}>
			<Modal.Header closeButton>Edit</Modal.Header>
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
					<Form.Group>
						<Form.Control
							as='textarea'
							name='content'
							value={formData.content}
							onChange={handleInputChange}
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

export default EditPost;
