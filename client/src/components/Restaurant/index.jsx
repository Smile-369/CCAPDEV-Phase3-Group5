/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Card, Modal } from 'react-bootstrap';
import Post from '../Post';
import useBufferToImage from '../../hooks/useBufferToImage';
import usePost from '../../hooks/usePost';
import Login from '../LoginModal';
import useAuth from '../../hooks/useAuth';

const Restaurant = ({ id, name, profile, description, ratings }) => {
	const {auth} = useAuth();
	const [show, setShow] = useState();
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	const [loginShow, setLoginShow] = useState();
	const handleLoginShow = () => setLoginShow(true);
	const handleLoginClose = () => setLoginShow(false);
	const profileImageSrc = useBufferToImage(profile);
	const { posts } = usePost();

	const renderPosts = posts.map((post) => {
		return (
			post.restaurantId === id && (
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
				/>
			)
		);
	});

	return (
		<>
			<Card
				className='mx-auto mb-4 rounded'
				style={{ maxWidth: '50rem' }}
				onClick={!auth ? handleShow : handleLoginShow}
			>
				<Card.Header>
					<img
						src={profileImageSrc}
						width={30}
						height={30}
						className='me-3'
						style={{ borderRadius: '50%' }}
					/>
					{name}
				</Card.Header>
				<Card.Body>
					{description} <br />
					<span className='small'>Ratings: {ratings} stars</span>
				</Card.Body>
			</Card>
			<Modal show={show} onHide={handleClose} size='lg'>
				<div className='p-5'>{renderPosts}</div>
			</Modal>
			<Login show={loginShow} handleClose={handleLoginClose} />
		</>
	);
};

export default Restaurant;
