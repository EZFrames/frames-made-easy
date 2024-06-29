"use client";

import { FrameMetadataType } from "@coinbase/onchainkit";
import type { NextPage } from "next";
import FrameEditor from "~~/components/FrameEditor";
import FrameRender from "~~/components/FrameRenderer";
import { APP_URL } from "~~/constants";
import { useState } from "react";
const FrameExample: FrameMetadataType = {
  buttons: [
    {
      label: `Vibes hai ye toh`,
    },
    {
      action: "link",
      label: "OnchainKit",
      target: "https://onchainkit.xyz",
    },
    {
      action: "post_redirect",
      label: "Dog pictures",
    },
  ],
  image: {
    src: `${APP_URL}/park-1.png`,
  },
  postUrl: `${APP_URL}/api/frame`,
  state: {
    time: new Date().toISOString(),
  },
};
const slides = [
  { id: 1, title: 'Frame 1', content: 'This is the first slide' },
  { id: 2, title: 'Frame 2', content: 'This is the second slide' },
  { id: 3, title: 'Frame 3', content: 'This is the third slide' },
 
];
const Product: NextPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);



  const sidebarStyle = {
    width: '450px',
    height : '645px',
    backgroundColor: '#f5f5f5',
    padding: '10px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto'
  };

  const thumbnailStyle = {
    padding: '10px',
    height:'300px',
    marginBottom: '10px',
    cursor: 'pointer',
    backgroundColor: 'lightBlue',
    borderRadius: '15px',
    transition: 'background-color 0.3s',

  };
      const thumbnailActiveStyle = {
    ...thumbnailStyle,
    backgroundColor: '#c0c0c0',
  };

  return (
    <div className="grid grid-cols-3 gap-4 pt-2 h-[100%]">
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
      

      <div className="col-span-1">
        <FrameRender frame={FrameExample} />
      </div>
      <div className="col-span-1 h-[100%]">
        <FrameEditor frame={FrameExample} />
      </div>
    </div>
  );
};

export default Product;
