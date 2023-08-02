import axios from '../api';
import useAuth from './useAuth';

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		const response = await axios.get('/refresh');
		setAuth((prev) => {
			return {
				...prev,
				_id: response.data.data._id,
				username: response.data.data.username,
				name: response.data.data.name,
				profile: response.data.data.profile,
				meta: response.data.data.meta,
				isOwner: response.data.data.isOwner
			};
		});
		return response.data.accessToken;
	};
	return refresh;
};

export default useRefreshToken;
