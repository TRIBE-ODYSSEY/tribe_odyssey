// import React from 'react';
// import Slider from 'react-slick';
// import { IMAGES } from '@assets/index';

// const LogoSection = () => {
//     const settings = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 5,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 2000,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 1,
//                 },
//             },
//             {
//                 breakpoint: 600,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                 },
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                 },
//             },
//         ],
//     };

//     const logos = [
//         IMAGES.logos.company1,
//         IMAGES.logos.company2,
//         IMAGES.logos.company3,
//         IMAGES.logos.company4,
//         IMAGES.logos.company5,
//     ];

//     return (
//         <div className="logo-section">
//             <Slider {...settings}>
//                 {logos.map((logo, index) => (
//                     <div key={index} className="logo-slide">
//                         <img src={logo} alt={`Company logo ${index + 1}`} />
//                     </div>
//                 ))}
//             </Slider>
//         </div>
//     );
// };

// export default LogoSection;
