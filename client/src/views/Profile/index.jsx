import { useParams } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Post from '../../components/Post';
import { useEffect, useState } from 'react';
import EditPost from '../../components/Post/EditPost';
import axios from '../../api';
import profile from '../../assets/images/profile.jpg';
import useAuth from '../../hooks/useAuth';
import EditProfile from './EditProfile';
import useBufferToImage from '../../hooks/useBufferToImage';
import usePost from '../../hooks/usePost';

const Profile = () => {
	const { auth } = useAuth();
	const { posts } = usePost();
	const [selected, setSelected] = useState();
	const [editShow, setEditShow] = useState();
	const [show, setShow] = useState();
	const handleOpen = () => setShow(true);
	const handleClose = () => setShow(false);
	const handleEditOpen = () => setEditShow(true);
	const handleEditClose = () => setEditShow(false);
	const { username } = useParams();
	const [user, setUser] = useState({});
	const profileImageSrc = useBufferToImage(user.profile);

	useEffect(() => {
		const getUser = async () => {
			const response = await axios.get(`/profile/username/${username}`);
			setUser(response.data.data);
		};

		getUser();
	}, [username]);

	const [filteredPosts, setFilteredPosts] = useState([]);
	useEffect(() => {
		setFilteredPosts(posts.filter((post) => post.userId === user._id));
	}, [posts, user._id]);

	const handleDelete = (postId) => {
		const updatedPosts = filteredPosts.filter((post) => post._id !== postId);
		setFilteredPosts(updatedPosts);
	};

	const handleEdit = (postId) => {
		setSelected(postId);
		handleOpen();
	};

	const handleSubmit = (data) => {
		const updatedData = filteredPosts.map((post) => {
			if (post._id === data._id) {
				return data;
			}
			return post;
		});
		setFilteredPosts(updatedData);
	};
	const renderPosts = filteredPosts.map((post) => (
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
	));

	const canEditButton =
		auth.username === username ? (
			<Button
				variant='primary'
				style={{ position: 'absolute', bottom: 10, right: 10 }}
				onClick={handleEditOpen}
			>
				Edit Profile
			</Button>
		) : (
			''
		);

	if (!user) {
		return <h1>MISSING USER</h1>;
	}

	return (
		<Container>
			<div style={{ position: 'relative' }}>
				<Container
					className='m-3'
					style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}
				>
					<Row>
						<Col className='d-flex align-items-center'>
							<img
								src={user.profile ? profileImageSrc : profile}
								width='150px'
							/>
							<div className='mx-5'>
								<h3>{user?.name}</h3>
								<p>{user?.bio}</p>
							</div>
						</Col>
					</Row>
				</Container>
				{/* Add the "Edit Profile" button */}
				{canEditButton}
			</div>
			{renderPosts}
			{show && (
				<EditPost
					show={show}
					onClose={handleClose}
					postId={selected}
					onSubmit={handleSubmit}
				/>
			)}
			<EditProfile show={editShow} handleClose={handleEditClose} data={user} />
		</Container>
	);
};

export default Profile;
