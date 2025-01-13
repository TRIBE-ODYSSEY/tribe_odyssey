import Slider, { Settings } from 'react-slick';
import Card from '../common/card/Card';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const brandLogos = [
  { 
    src: '/images/THRADS-logo.png', 
    alt: 'THRADS',
    size: '120px'
  },
  { 
    src: '/images/E19-Logo.jpg', 
    alt: 'Element 19',
    size: '120px'
  },
  { 
    src: '/images/MW.jpg', 
    alt: 'MW',
    size: '120px'
  },
  { 
    src: '/images/DAYLAVA.png', 
    alt: 'DAYLAVA',
    size: '120px'
  },
] as const;

const StyledSliderContainer = styled.div`
  .logo-slider-container {
    margin: 0 -20px;
  }
  
  .logo-slider .slick-track {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .logo-slider .slick-slide {
    opacity: 0.7;
    transition: all 0.3s ease;
    transform: scale(0.9);
  }
  
  .logo-slider .slick-slide.slick-active {
    opacity: 1;
    transform: scale(1);
  }
  
  .logo-slider .slick-slide:hover {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    .logo-slider-container {
      margin: 0 -10px;
    }
  }
`;

export default function LogoSection() {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: true,
    arrows: false,
    centerMode: true,
    centerPadding: '60px',
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          centerPadding: '40px',
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: '30px',
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: '20px',
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: '10px',
        },
      },
    ],
  };

  return (
    <StyledSliderContainer>
      <section className="w-full py-12 sm:py-16 overflow-hidden bg-gradient-to-b from-transparent to-black/5">
        <motion.div 
          className="max-w-7xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-white/90">
            Community Brands
          </h2>
          
          <div className="logo-slider-container -mx-4">
            <Slider {...settings} className="logo-slider">
              {brandLogos.map((logo, index) => (
                <motion.div 
                  key={`${logo.alt}-${index}`}
                  className="px-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="rounded-full overflow-hidden bg-white/5 backdrop-blur-sm 
                                hover:bg-white/10 transition-all duration-300 p-4">
                    <Card
                      image={{
                        'data-src': logo.src,
                        alt: logo.alt,
                        objectFit: 'contain',
                      }}
                      isSquare={logo.size}
                      className="mx-auto bg-transparent rounded-full transform 
                               transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </motion.div>
              ))}
            </Slider>
          </div>
        </motion.div>
      </section>
    </StyledSliderContainer>
  );
}
