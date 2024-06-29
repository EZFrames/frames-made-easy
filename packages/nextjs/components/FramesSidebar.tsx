import FrameRender from "./FrameRenderer";
import { FrameMetadataType } from "@coinbase/onchainkit";
import { useState } from "react";
type FrameRenderProps = {
  frames: FrameMetadataType[];
};






function FrameSidebar({ frames }: FrameRenderProps) {
     const [currentSlide, setCurrentSlide] = useState(0);

const slides = [
  { id: 1, title: 'Frame 1', content: 'This is the first slide', img:'https://ipfs.io/ipfs/QmVc3Cb4onDDjGRoELc2HUhiCdDGz5nWkwCUXXMPre27bs' },
  { id: 2, title: 'Frame 2', content: 'This is the second slide',img:'https://ipfs.io/ipfs/QmVc3Cb4onDDjGRoELc2HUhiCdDGz5nWkwCUXXMPre27bs'  },
  { id: 3, title: 'Frame 3', content: 'This is the third slide',img:'https://ipfs.io/ipfs/QmVc3Cb4onDDjGRoELc2HUhiCdDGz5nWkwCUXXMPre27bs'  },
  { id: 3, title: 'Frame 3', content: 'This is the third slide',img:'https://ipfs.io/ipfs/QmVc3Cb4onDDjGRoELc2HUhiCdDGz5nWkwCUXXMPre27bs'  },
  { id: 3, title: 'Frame 3', content: 'This is the third slide' ,img:'https://ipfs.io/ipfs/QmVc3Cb4onDDjGRoELc2HUhiCdDGz5nWkwCUXXMPre27bs' },
        { id: 3, title: 'Frame 3', content: 'This is the third slide',img:'https://ipfs.io/ipfs/QmVc3Cb4onDDjGRoELc2HUhiCdDGz5nWkwCUXXMPre27bs'  },
 
];
  const thumbnailImageStyle = {
    marginTop: '-7px',
    marginLeft:'7px',
    maxWidth: '90%',
    height: 'auto',
    borderRadius: '5px',
  };
  const sidebarStyle = {
    width: '250px',
    height : '645px',
    marginLeft: "10px",
 marginRight:"20px",
    padding: '10px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    overflow: 'auto'
  };

  const thumbnailStyle = {
    padding: '10px',
    height:'200px',
    marginBottom: '10px',
    boxShadow: '2px 2px 2px grey',
    cursor: 'pointer',
 borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: '15px',
    transition: 'background-color 0.3s',

  };
      const thumbnailActiveStyle = {
    ...thumbnailStyle,
    backgroundColor: '#c0c0c0',
  };
  return (
    <div style={sidebarStyle}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            style={index === currentSlide ? thumbnailActiveStyle : thumbnailStyle}
            onClick={() => setCurrentSlide(index)}
          >
     <img src={slide.img} alt={slide.title} style={thumbnailImageStyle} />
  <div style={{alignItems:"center", justifyContent:"center", display:"flex", marginTop:"-0px"}}>{slide.title}</div>
          </div>
        ))}
      
      </div>
  );
}

export default FrameSidebar;
