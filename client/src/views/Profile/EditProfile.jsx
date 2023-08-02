import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import axios from '../../api';

const EditProfile = ({ show, handleClose, data }) => {
	const { auth } = useAuth();
	const [formData, setFormData] = useState({
		name: '',
		bio: '',
		profile: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(`/edit-profile/id/${auth._id}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data', // Set the appropriate content type
				},
			});
			if (response.status === 200) {
				handleClose();
				window.location.reload();
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
			setFormData({ ...formData, profile: file });
		} else {
			// Optionally handle invalid file type here, e.g., show an error message to the user
		}
	};

	const handleOnClose = () => {
		setFormData({
			name: '',
			bio: '',
			profile: '',
		});
		handleClose();
	};

	return (
		<Modal show={show} onHide={handleOnClose}>
			<Modal.Header closeButton>Edit Profile</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mb-3'>
						<Form.Control
							type='text'
							placeholder='Name'
							className='rounded mb-2'
							name='name'
							value={ formData.name}
							onChange={handleInputChange}
						/>
					</Form.Group>
					<Row></Row>
					<Form.Group className='mb-3'>
						<Form.Label>Bio</Form.Label>
						<Form.Control
							as='textarea'
							name='bio'
							value={ formData.bio}
							onChange={handleInputChange}
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
					<Button className='mt-2' type='submit'>
						Submit
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default EditProfile;
