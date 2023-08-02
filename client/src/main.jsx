import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootswatch/dist/lux/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider.jsx';
import { PostProvider } from './context/PostProvider.jsx';
import { RestaurantProvier } from './context/RestaurantProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<RestaurantProvier>
					<PostProvider>
						<App />
					</PostProvider>
				</RestaurantProvier>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
