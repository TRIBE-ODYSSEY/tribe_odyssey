import Slider, { Settings } from 'react-slick';
import Card from '../common/card/Card';

export default function LogoSection() {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

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
  ];

  return (
    <section className="w-full px-4 py-6 sm:py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Community Brands
        </h2>
        
        <div className="-mx-2">
          <Slider {...settings} className="logo-slider">
            {brandLogos.map((logo) => (
              <div key={logo.alt} className="px-2">
                <Card
                  image={{
                    'data-src': logo.src,
                    alt: logo.alt,
                    objectFit: 'contain',
                  }}
                  isSquare={logo.size}
                  className="mx-auto backdrop-blur-none bg-transparent"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
