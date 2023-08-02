import { Container } from 'react-bootstrap'
import Restaurant from '../../components/Restaurant'
import useRestaurant from '../../hooks/useRestaurant'

export const Reviews = () => {
  const {restaurants} = useRestaurant();
  return (
    <Container>
    {restaurants.map((restaurant) => (
      <Restaurant 
        key={restaurant._id}  
        id={restaurant._id}
        profile={restaurant.profile}
        name={restaurant.name}
        description={restaurant.bio} 
        ratings={restaurant.ratings}
      />
    ))} 
    </Container>
  )
}
