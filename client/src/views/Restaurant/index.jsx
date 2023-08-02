import { useParams } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import profile from '../../assets/images/profile.jpg';
import { useEffect, useState } from 'react';
import axios from '../../api';
import useBufferToImage from '../../hooks/useBufferToImage';
import useAuth from '../../hooks/useAuth';
import EditRestaurant from './EditRestaurant';
import Post from '../../components/Post';
import usePost from '../../hooks/usePost';
import EditPost from '../../components/Post/EditPost';

const Restaurant = () => {
	const { name } = useParams();
	const { auth } = useAuth();
	const { posts } = usePost();
	const [selected, setSelected] = useState();
	const [restaurant, setRestaurant] = useState({});
	const [editShow, setEditShow] = useState();
	const [show, setShow] = useState();
	const handleOpen = () => setShow(true);
	const handleClose = () => setShow(false);
	const handleEditOpen = () => setEditShow(true);
	const handleEditClose = () => setEditShow(false);
	const profileImageSrc = useBufferToImage(restaurant.profile);

	const [filteredPosts, setFilteredPosts] = useState([]);
	useEffect(() => {
		setFilteredPosts(
			posts.filter((post) => post.restaurantId === restaurant._id)
		);
	}, [posts, restaurant._id]);

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

	useEffect(() => {
		const getRestaurant = async () => {
			const response = await axios.get(`/restaurants/name/${name}`);
			if (response.status === 200) setRestaurant(response.data.data);
		};
		getRestaurant();
	}, [name]);

	const canEditButton =
		auth._id === restaurant.userId ? (
			<Button
				variant='primary'
				style={{ position: 'absolute', bottom: 10, right: 10 }}
				onClick={handleEditOpen}
			>
				Edit Restaurant
			</Button>
		) : (
			''
		);

	if (!restaurant) {
		return <h1>Missing Restaurant</h1>;
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
							<img src={restaurant.profile ? profileImageSrc : profile} />
							<div className='mx-5'>
								<h3>{restaurant.name}</h3>
								<p>{restaurant.bio}</p>
								<h3>★ {restaurant.ratings}</h3>
							</div>
						</Col>
					</Row>
					{canEditButton}
				</Container>
			</div>
			<EditRestaurant
				show={editShow}
				handleClose={handleEditClose}
				data={restaurant}
			/>
			{renderPosts}
			{show && (
				<EditPost
					show={show}
					onClose={handleClose}
					postId={selected}
					onSubmit={handleSubmit}
				/>
			)}
		</Container>
	);
};

export default Restaurant;
