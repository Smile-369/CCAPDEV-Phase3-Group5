/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import axios from '../api';

const RestaurantContext = createContext({});

export const RestaurantProvier = ({ children }) => {
	const [restaurants, setRestaurants] = useState([]);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await axios.get('/all-restaurants');
				const data = response.data.data;
				setRestaurants(data);
			} catch (e) {
				console.error('Error fetching post', e);
			}
		};

		fetchPost();
	}, []);

	return (
		<RestaurantContext.Provider value={{  restaurants, setRestaurants }}>
			{children}
		</RestaurantContext.Provider>
	);
};

export default RestaurantContext;
