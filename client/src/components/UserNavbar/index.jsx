import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from '../../api'
const Header = () => {
	const { auth } = useAuth();

	const navigate = useNavigate();
	const restaurant =async () => {
		if (auth.isOwner) {
		const userId = auth._id
			const response = await axios.get(`/restaurant/userId/${userId}`)
			const name = response.data.data.name
			navigate(`/restaurant/${name}`)
		} else navigate(`/create-restaurant`);
	};

	return (
		<Navbar expand='lg' bg='dark' sticky='top' data-bs-theme='dark'>
			<Container fluid>
				<Nav>
					<Nav.Link as={Link} to='/dashboard'>
						Dashboard
					</Nav.Link>
				</Nav>
				<Navbar.Text>
					<NavDropdown title={auth.name}>
						<NavDropdown.Item
							onClick={() => {
								navigate(`/profile/${auth.username}`);
							}}
						>
							Profile
						</NavDropdown.Item>
						<NavDropdown.Item onClick={restaurant}>
							My Restaurant
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item
							onClick={() => {
								navigate('/');
							}}
						>
							Logout
						</NavDropdown.Item>
					</NavDropdown>
				</Navbar.Text>
			</Container>
		</Navbar>
	);
};

export default Header;
