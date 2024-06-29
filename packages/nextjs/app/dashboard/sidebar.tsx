// src/App.js

import React, { useState } from 'react';

const slides = [
  { id: 1, title: 'Slide 1', content: 'This is the first slide' },
  { id: 2, title: 'Slide 2', content: 'This is the second slide' },
  { id: 3, title: 'Slide 3', content: 'This is the third slide' },
 
];

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const appStyle = {
    display: 'flex',
    height: '100vh',
  };

  const sidebarStyle = {
    width: '200px',
    backgroundColor: '#f5f5f5',
    padding: '10px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto',
  };

  const thumbnailStyle = {
    padding: '10px',
    marginBottom: '10px',
    cursor: 'pointer',
    backgroundColor: 'white',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  };

  const thumbnailActiveStyle = {
    ...thumbnailStyle,
    backgroundColor: '#c0c0c0',
  };

  const mainSlideStyle = {
    flexGrow: 1,
    padding: '20px',
  };

  const mainSlideTitleStyle = {
    marginTop: 0,
  };

  return (
    <div style={appStyle}>
      <div style={sidebarStyle}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            style={index === currentSlide ? thumbnailActiveStyle : thumbnailStyle}
            onClick={() => setCurrentSlide(index)}
          >
            {slide.title}
          </div>
        ))}
      </div>
      <div style={mainSlideStyle}>
        <h2 style={mainSlideTitleStyle}>{slides[currentSlide].title}</h2>
        <p>{slides[currentSlide].content}</p>
      </div>
    </div>
  );
};

export default App;

