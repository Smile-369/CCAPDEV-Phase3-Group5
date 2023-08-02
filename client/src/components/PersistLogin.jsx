/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	const { auth } = useAuth();

	useEffect(() => {
		const verifyId = async () => {
			try {
				await refresh();
			} catch (err) {
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		};
		!auth?._id ? verifyId() : setIsLoading(false);
	}, []);

	return <>{isLoading ? <p>Loading ...</p> : <Outlet />}</>;
};

export default PersistLogin;
