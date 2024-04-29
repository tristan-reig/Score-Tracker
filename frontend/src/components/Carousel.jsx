import React, { useState } from "react";

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = React.Children.count(children);

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalSlides - 1 ? prevIndex : prevIndex + 1));
  };

  return (
    <div className="overflow-x-hidden relative">
      <div className="flex transition-transform duration-300 transform -translate-x-full" style={{ width: `${totalSlides * 100}%`, transform: `translateX(-${currentIndex * (100 / totalSlides)}%)` }}>
        {React.Children.map((children), (child) => (
          <div className={`w-full ${currentIndex === 1 ? "m-5" : ""}`}>{child}</div>
        ))}
      </div>
      {currentIndex === 1 && <button className="absolute top-1/2 left-3 flex btn btn-circle" onClick={goToPreviousSlide}>{'<'}</button>}
      {totalSlides >= 2 && currentIndex === 0 && <button className="absolute top-1/2 right-3 flex btn btn-circle" onClick={goToNextSlide}>{'>'}</button>}
    </div>
  );
};

export default Carousel;