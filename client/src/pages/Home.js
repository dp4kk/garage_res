import React from "react";
import Carousel from "react-elastic-carousel";
import slides from '../images.json'
export const Home = () => {

  
  return (
    <div>
      <Carousel>
        {slides.map((item) => (
          <div key={item.id}>
            <img src={item.image} height={600} width={1000} alt={item.name} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Home;
