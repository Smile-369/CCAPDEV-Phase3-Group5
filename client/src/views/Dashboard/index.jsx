import { Button, Container, Form } from 'react-bootstrap';
import profile from '../../assets/images/profile.jpg';
import Post from '../../components/Post';
import { useEffect, useState } from 'react';
import PostModal from '../../components/Post/PostModal';
import useAuth from '../../hooks/useAuth';
import useBufferToImage from '../../hooks/useBufferToImage';
import usePost from '../../hooks/usePost';
import EditPost from '../../components/Post/EditPost';

const Dashboard = () => {
	const { auth } = useAuth();
	const profileImageSrc = useBufferToImage(auth.profile);
	const { posts } = usePost();
	const [show, setShow] = useState();
	const [postData, setPostData] = useState([]);
	const [selected, setSelected] = useState();
	const [editShow, setEditShow] = useState();
	const handleEditOpen = () => setEditShow(true);
	const handleEditClose = () => setEditShow(false);

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	useEffect(() => {
		setPostData(posts);
	}, [posts]);

	const onSubmit = (data) => {
		postData.push(data);
		handleClose();
	};

	const handleDelete = (postId) => {
		const updatedPost = postData.filter((post) => post._id !== postId);
		setPostData(updatedPost);
	};

	const handleEdit = (postId) => {
		setSelected(postId);
		handleEditOpen();
	};

	const handleEditSubmit = (data) => {
		const updatedData = postData.map((post) => {
			if (post._id === data._id) {
				return data;
			}
			return post;
		});
		setPostData(updatedData);
	};

	return (
		<Container style={{ backgroundColor: '#eee', margin: 0 }} fluid>
			<div className='d-flex justify-content-center align-items-center py-3'>
				<img
					src={auth.profile ? profileImageSrc : profile}
					width={50}
					height={50}
					className='me-2 rounded'
				/>
				<Form.Control
					type='text'
					className='me-2'
					placeholder='Create post'
					style={{ maxWidth: '40rem' }}
					onClick={handleShow}
				/>
				<Button onClick={handleShow}>Post</Button>
			</div>
			<PostModal show={show} handleClose={handleClose} onSubmit={onSubmit} />
			{postData.map((post) => (
				<Post
					key={post._id}
					postId={post._id}
					userId={post.userId}
					name={post.name}
					restaurantId={post.restaurantId}
					title={post.title}
					content={post.content}
					rating={post.rating}
					upvote={post.upvote}
					downvote={post.downvote}
					onDelete={handleDelete}
					onEdit={handleEdit}
				/>
			))}
			{editShow && (
				<EditPost
					show={editShow}
					onClose={handleEditClose}
					postId={selected}
					onSubmit={handleEditSubmit}
				/>
			)}
		</Container>
	);
};

export default Dashboard;
