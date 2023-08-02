/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import axios from '../api';

const PostContext = createContext({});

export const PostProvider = ({ children }) => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await axios.get('/all-reviews');
				const data = response.data.data;
				setPosts(data);
			} catch (e) {
				console.error('Error fetching post', e);
			}
		};

		fetchPost();
	}, []);

	return (
		<PostContext.Provider value={{ posts, setPosts }}>
			{children}
		</PostContext.Provider>
	);
};

export default PostContext;
