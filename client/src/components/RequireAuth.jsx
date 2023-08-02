import useAuth from '../hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
	const { auth } = useAuth();
	const location = useLocation(); 
	return auth?._id ? (
		<Outlet />
	) : (
		<Navigate to='/' state={{ from: location }} replace />
	);
};

export default RequireAuth;
