import { Route, Routes } from 'react-router-dom';
import HomeLayout from './components/HomeLayout';
import Home from './views/Home';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import UserLayout from './components/UserLayout';
import Profile from './views/Profile';
import Restaurant from './views/Restaurant';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import NewRestaurant from './views/Restaurant/New.Restaurant';

function App() {
	return (
		<Routes>
			<Route element={<HomeLayout />}>
				<Route path='/' element={<Home />} />
			</Route>
			<Route path='/register' element={<Register />} />
			<Route element={<PersistLogin />}>
				<Route element={<RequireAuth />}>
					<Route element={<UserLayout />}>
						<Route path='/dashboard' element={<Dashboard />} />
						<Route path='/create-restaurant' element={<NewRestaurant />} />
						<Route path='/profile/:username' element={<Profile />} />
						<Route path='/restaurant/:name' element={<Restaurant />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
