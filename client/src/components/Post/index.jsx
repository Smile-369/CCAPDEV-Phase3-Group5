/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {
	Button,
	Card,
	Col,
	Container,
	Form,
	Overlay,
	Popover,
	Row,
} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import thumbsUp from '../../assets/images/t-up.png';
import thumbsDown from '../../assets/images/t-down.png';
import thumbsUpFilled from '../../assets/images/t-upfill.png';
import thumbsDownFilled from '../../assets/images/t-downfill.png';
import threedots from '../../assets/images/threedots.png';
import Login from '../LoginModal';
import Response from '../Response';
import useAuth from '../../hooks/useAuth';
import axios from '../../api';
import useBufferToImage from '../../hooks/useBufferToImage';
import profile from '../../assets/images/profile.jpg';

const Post = ({
	userId,
	postId,
	restaurantId,
	title,
	content,
	rating,
	upvote,
	downvote,
	onDelete,
	onEdit,
}) => {
	const location = useLocation();
	const { auth } = useAuth();
	const [show, setShow] = useState();
	const handleOpen = () => setShow(true);
	const handleClose = () => setShow(false);
	const [responses, setResponses] = useState();
	const [restaurant, setRestaurant] = useState();
	const [user, setUser] = useState();
	const [showMenu, setShowMenu] = useState(false);
	const [target, setTarget] = useState(null);
	const profileImageSrc = useBufferToImage(user?.profile);
	const handleMenuClick = (event) => {
		setShowMenu(!showMenu);
		setTarget(event.target);
	};

	const [isLiked, setIsLiked] = useState();
	const [isDisliked, setIsDisliked] = useState();
	const [upvotes, setUpvotes] = useState(upvote.length);
	const [downvotes, setDownvotes] = useState(downvote.length);

	useEffect(() => {
		const getRestaurant = async () => {
			const response = await axios.get(
				`/restaurant/restaurantId/${restaurantId}`
			);
			setRestaurant(response.data.data._doc);
			setResponses(response.data.data.comments);
		};
		getRestaurant();
	}, [restaurantId]);

	useEffect(() => {
		const getUser = async () => {
			const response = await axios.get(`/user/userId/${userId}`);
			setUser(response.data.data);
		};
		getUser();
	}, [userId]);

	useEffect(() => {
		if (auth) {
			const liked = auth.meta.likes.includes(postId);
			setIsLiked(liked);
			const disliked = auth.meta.dislikes.includes(postId);
			setIsDisliked(disliked);
		}
	}, [auth, postId]);

	const handleOnDelete = async () => {
		try {
			const response = await axios.delete(`/reviews/delete/postId/${postId}`);
			if (response.status === 200) {
				onDelete(postId);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleOnEdit = () => {
		onEdit(postId);
	};

	const [comment, setComment] = useState('');

	const handleCommentChange = (event) => {
		setComment(event.target.value);
	};
	const handleCommentSubmit = async (event) => {
		event.preventDefault();
		if (!auth) {
			handleOpen();
		} else {
			try {
				await axios.post('/comment', {
					postId: postId,
					restaurantId: restaurantId,
					content: comment,
				});

				window.location.reload();
			} catch (error) {
				console.error(error);
			}
			setComment('');
		}
	};

	const updateVotes = (voteType) => {
		if (!auth) {
			handleOpen();
		} else {
			let updatedUpvotes = upvotes;
			let updatedDownvotes = downvotes;

			if (voteType === 'upvote') {
				if (isLiked) {
					auth.meta.likes = auth.meta.likes.filter((like) => like !== postId);
					updatedUpvotes--;
				} else {
					auth.meta.likes.push(postId);
					updatedUpvotes++;
					if (isDisliked) {
						auth.meta.dislikes = auth.meta.dislikes.filter(
							(like) => like !== postId
						);
						updatedDownvotes--;
						setIsDisliked(false);
					}
				}
				setIsLiked((prev) => !prev);
			} else if (voteType === 'downvote') {
				if (isDisliked) {
					auth.meta.dislikes = auth.meta.dislikes.filter(
						(like) => like !== postId
					);
					updatedDownvotes--;
				} else {
					auth.meta.dislikes.push(postId);
					updatedDownvotes++;
					if (isLiked) {
						auth.meta.likes = auth.meta.likes.filter((like) => like === postId);
						updatedUpvotes--;
						setIsLiked(false);
					}
				}
				setIsDisliked((prev) => !prev);
			}

			setUpvotes(updatedUpvotes);
			setDownvotes(updatedDownvotes);
		}
	};

	const onThumbsUp = async () => {
		const response = await axios.put('/review/like', {
			postId: postId,
			userId: auth._id,
		});
		if (response.status === 200) {
			updateVotes('upvote');
		}
	};

	const onThumbsDown = async () => {
		const response = await axios.put('/review/dislike', {
			postId: postId,
			userId: auth._id,
		});
		if (response.status === 200) {
			updateVotes('downvote');
		}
	};

	const renderResponses = responses?.map((response) => {
		return response.restaurantId === restaurantId &&
			response.postId === postId ? (
			<Response
				key={response._id}
				restaurantId={response.restaurantId}
				content={response.content}
			/>
		) : (
			''
		);
	});

	if (!user) {
		return 'Loading';
	}

	const RenderComment =
		location.pathname.includes('/restaurant') &&
		auth?._id === restaurant?.userId ? (
			<Container>
				<Form
					onSubmit={handleCommentSubmit}
					className='form-inline'
					style={{
						boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
						padding: '20px',
					}}
				>
					<Row>
						<Col xs={9} sm={10}>
							<Form.Group className='mb-2 mr-2 w-100'>
								<Form.Control
									type='text'
									placeholder='Add a comment'
									value={comment}
									onChange={handleCommentChange}
									className='w-100'
								/>
							</Form.Group>
						</Col>
						<Col xs={3} sm={2}>
							<Button type='submit' className='mb-2'>
								Send
							</Button>
						</Col>
					</Row>
				</Form>
			</Container>
		) : (
			''
		);

	return (
		<>
			<Card className='mx-auto mb-3 rounded' style={{ maxWidth: '50rem' }}>
				<div className='d-flex'>
					<div className='text-center'>
						<div>
							<button className='btn btn-link rounded' onClick={onThumbsUp}>
								<img
									src={isLiked ? thumbsUpFilled : thumbsUp}
									alt='thumbs-up'
								/>
							</button>
							<span style={{ fontSize: 12 }}>{upvotes}</span>
						</div>
						<div>
							<button className='btn btn-link rounded' onClick={onThumbsDown}>
								<img
									src={isDisliked ? thumbsDownFilled : thumbsDown}
									alt='thumbs-down'
								/>
							</button>
							<span style={{ fontSize: 12 }}>{downvotes}</span>
						</div>
					</div>
					<div className='w-100'>
						<Card.Header className='d-flex justify-content-between'>
							<div>
								<img
									src={user.profile ? profileImageSrc : profile}
									width={30}
									height={30}
									className='me-3'
									style={{ borderRadius: '50%' }}
								/>
								{user !== null ? (
									<Link
										to={`/profile/${user.username}`}
										style={{ textDecoration: 'none' }}
									>
										{user.name}
									</Link>
								) : (
									<span>{user.name}</span>
								)}
								•{' '}
								{restaurant ? (
									<Link
										to={`/restaurant/${restaurant.name}`}
										style={{ textDecoration: 'none' }}
									>
										{restaurant?.name}
									</Link>
								) : (
									<span>{restaurant?.name}</span>
								)}
							</div>
							<div>
								<span className='small me-3'>Ratings: {rating} stars</span>
								{userId === auth?._id && (
									<span onClick={handleMenuClick} className='small'>
										<img src={threedots} width={20} />
									</span>
								)}
							</div>
							<Overlay
								show={showMenu}
								target={target}
								placement='right'
								onHide={() => setShowMenu(false)}
								rootClose
							>
								<Popover id='menu-popover'>
									<div className=' d-flex flex-column'>
										<Button onClick={handleOnEdit}>Edit</Button>
										<Button onClick={handleOnDelete}>Delete</Button>
									</div>
								</Popover>
							</Overlay>
						</Card.Header>
						<Card.Body>
							<h5 className='text-center'> {title}</h5>
							<p>{content}</p> <br />
						</Card.Body>
					</div>
				</div>
				<Card.Footer>{renderResponses}</Card.Footer>
				{RenderComment}
			</Card>
			<Login show={show} handleClose={handleClose} />
		</>
	);
};

export default Post;
