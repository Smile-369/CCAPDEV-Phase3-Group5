import axios from 'axios';

export default axios.create({
	// baseURL: 'https://restaurantchecker-api.vercel.app/api',
	// baseURL: 'http://localhost:8080/api',
	baseURL: 'https://ccapdev-phase3-group5-kb53.vercel.app/api',
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});
