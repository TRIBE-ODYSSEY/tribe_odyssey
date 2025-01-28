import { FC } from "react";
import styled from "styled-components";
import * as moment from "moment";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import { useNavigate } from "react-router-dom";
import useWinners from "@src/lib/hooks/useWinners";
import Slider from "react-slick";
import PageLayout from '@src/components/common/layout/PageLayout';
import PageTitle from '@src/components/common/PageTitle';

interface AboutPageProps {}

const WinnersPage: FC<AboutPageProps> = () => {
  const { raffles } = useWinners(0);
  const navigate = useNavigate();

  const PrevArrow = (props: any) => (
    <div className="slick-arrow slick-prev" onClick={props.onClick}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1403_1194)">
          <path
            d="M18.0473 20L26.2973 28.25L23.9407 30.6067L13.334 20L23.9407 9.39334L26.2973 11.75L18.0473 20Z"
            fill="#929292"
          />
        </g>
        <defs>
          <clipPath id="clip0_1403_1194">
            <rect width="40" height="40" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );

  const NextArrow = (props: any) => (
    <div className="slick-arrow slick-next" onClick={props.onClick}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1403_1193)">
          <path
            d="M21.9531 20L13.7031 11.75L16.0598 9.39334L26.6665 20L16.0598 30.6067L13.7031 28.25L21.9531 20Z"
            fill="#929292"
          />
        </g>
        <defs>
          <clipPath id="clip0_1403_1193">
            <rect width="40" height="40" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024, // Adjust the breakpoint value as needed
        settings: {
          slidesToShow: 3, // Modify the number of slides to show on this breakpoint
        },
      },
      {
        breakpoint: 768, // Adjust the breakpoint value as needed
        settings: {
          slidesToShow: 2, // Modify the number of slides to show on this breakpoint
        },
      },
      {
        breakpoint: 480, // Adjust the breakpoint value as needed
        settings: {
          slidesToShow: 1, // Modify the number of slides to show on this breakpoint
        },
      },
    ],
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <PageTitle>Winners</PageTitle>
        
        <div className="mt-6 text-center text-theme-grey mx-auto max-w-[600px]">
          <p>Past raffle winners. Winners are grinners!</p>
        </div>

        <div className="mt-12 max-w-[900px] mx-auto">
          <Slider {...settings}>
            {(raffles || []).map((raffle: any) => (
              <div className="cardwrapper" key={raffle.id}>
                <Card>
                  <div className="relative">
                    <img src={raffle.prize_image} alt="" />
                    <div className="absolute bottom-2  flex justify-between w-full text-[12px] px-2">
                      <div
                        className="bg-[#ffffff] font-semibold py-1 px-2 rounded-full"
                        style={{ color: "#80839A" }}
                      >
                        #{raffle.nft_id}
                      </div>
                      <div className="bg-[#ffc700] text-black font-bold px-2 py-1 rounded-full whitespace-nowrap">
                        {moment
                          .utc()
                          .diff(moment.utc(raffle.raffle_at), "days")}{" "}
                        Days Ago
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="py-2">
                      <h4>{raffle.project_name}</h4>
                      <p className="mt-1 text-xs" style={{ color: "#80839A" }}>
                        #{raffle.nft_id}
                      </p>
                    </div>
                    <Button
                      onClick={() => navigate(`/raffle/${raffle.id}`)}
                    >
                      View Winner
                    </Button>
                    <div
                      className="py-3  font-semibold text-center"
                      style={{
                        color: "#80839A",
                        fontSize: "12px",
                      }}
                    >
                      {raffle.entry_count || 0} ENTRIES
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </PageLayout>
  );
};

const Card = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid rgba(128, 131, 154, 0.5);
  border-radius: 6px;
  padding: 10px 10px;
`;

const Button = styled.button`
  width: 100%;
  background: linear-gradient(to right, #d326fd, #a232f1) padding-box,
    linear-gradient(to right, #37dcb3, #ffffff) border-box;
  border: 2px solid transparent;
  padding: 6px 6px;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    opacity: 0.7;
  }
`;

export default WinnersPage;
