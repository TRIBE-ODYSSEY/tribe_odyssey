import Slider, { Settings } from 'react-slick';

import Card from '../common/card/Card';

export default function LogoSection() {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    variableWidth: true,
    centerMode: false,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    rtl: false,
    // Dodaj również:
    pauseOnHover: false,
  };

  const brandLogos = [
    { src: '/images/brand1.png', alt: 'Brand 1' },
    { src: '/images/brand2.png', alt: 'Brand 2' },
    { src: '/images/brand3.png', alt: 'Brand 3' },
  ];

  return (
    <section className="w-full px-4 py-8">
      <section className="max-w-7xl mx-auto">
        <Slider {...settings} className="logo-slider">
          {brandLogos.map((logo, index) => (
            <section key={index} className="px-2">
              <Card
                image={{
                  'data-src': logo.src,
                  alt: logo.alt || `Brand ${index + 1}`,
                }}
                className="w-40 h-40 mx-auto"
              />
            </section>
          ))}
        </Slider>
      </section>
    </section>
  );
}
