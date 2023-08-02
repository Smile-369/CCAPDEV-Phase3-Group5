import {  Carousel, Container } from "react-bootstrap"
import image1 from '../../assets/images/image1.jpg'
import image2 from '../../assets/images/image2.jpg'
import image3 from '../../assets/images/image3.jpg'
import { ContactUs } from "./ContactUs"
import { AboutUs } from "./AboutUs"
import { Reviews } from "./Reviews"

const imageData = [
  {
    label: "Image 1",
    alt: "image1",
    url : image1,
  },
  {
    label: "Image 2",
    alt: "image2",
    url : image2,
  },
  {
    label: "Image 3",
    alt: "image3",
    url : image3,
  }
]

const Home= () => {
  const renderSlides = imageData.map((image) => (
    <Carousel.Item key={image.alt}>
      <img style={{ height: '400px', width: '100%', objectFit: 'cover'}} src={image.url} alt={image.alt} />
    </Carousel.Item> 
  ))

  return (
    <Container fluid className="my-5">
      <section id="home" className="text-center mt-5">
        <h2>Discover the best restaurants</h2>
        <p>Explore reviews and recommendations for top restaurants in your area.</p>
        <Carousel>
          {renderSlides}
        </Carousel>
      </section>
      <section id="reviews" className="mt-5">
        <h2 className="text-center">Establishments</h2>
        <Reviews/>
      </section>
      <section id="about" className="text-center mt-5 p-5" style={{backgroundColor: '#f9f9f9'}}>
        <h2>About us</h2>
        <AboutUs/>
       </section>
      <section id="contact" className="text-center mt-5">
        <h2>Contact Us</h2>
        <ContactUs/>
      </section>
    </Container>
  )
}

export default Home
