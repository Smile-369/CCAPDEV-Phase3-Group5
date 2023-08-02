/* eslint-disable react/prop-types */
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useRestaurant from '../../hooks/useRestaurant';
import { useEffect, useState } from 'react';
import useBufferToImage from '../../hooks/useBufferToImage';

const Response = ({ restaurantId, content }) => {
	const { auth: currentUser } = useAuth();
	const { restaurants } = useRestaurant();
	const [restaurant, setRestaurant] = useState({});
	const restaurantProfile = useBufferToImage(restaurant.profile);
	useEffect(() => {
		setRestaurant(
			restaurants.find((restaurant) => {
				return restaurant._id === restaurantId;
			})
		);
	}, [restaurantId, restaurants, setRestaurant]);

	if (!restaurant) {
		return <h1>No Restaurant found</h1>;
	}

	return (
		<Card>
			<Card.Header>
				<div>
					<img
						src={restaurantProfile}
						width={30}
						height={30}
						className='me-3'
						style={{ borderRadius: '50%' }}
					/>
					{currentUser !== null ? (
						<Link
							to={`/restaurant/${restaurant.name}`}
							style={{ textDecoration: 'none' }}
						>
							{restaurant.name}
						</Link>
					) : (
						<span>{restaurant.name}</span>
					)}{' '}
				</div>
			</Card.Header>
			<Card.Body>{content}</Card.Body>
		</Card>
	);
};

export default Response;
