
import { useInView } from "react-intersection-observer";
import CardBidMain from "@components/Common/home/CardBidMain";
import HexagonalGrid from "@components/Common/home/HexagonalGrid";
import { IMAGES } from "@config/contracts/constants/images";

const LatestNewsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const newsItems = [
    {
      id: 1,
      title: "New Partnership Announcement",
      description: "Exciting collaboration with leading NFT platform...",
      image: IMAGES.odyssey.nft1,
      date: "March 1, 2024",
      link: "#",
    },
    {
      id: 2,
      title: "Community Update",
      description: "Latest developments and upcoming features...",
      image: IMAGES.odyssey.nft2,
      date: "February 28, 2024",
      link: "#",
    },
    {
      id: 3,
      title: "Special Event Coming Soon",
      description: "Get ready for an exclusive community event...",
      image: IMAGES.odyssey.nft3,
      date: "February 25, 2024",
      link: "#",
    },
  ];

  return (
    <div className="container mx-auto py-6 md:py-12 relative">
      <HexagonalGrid />
      <div ref={ref}>
        <h2 className="text-4xl md:text-6xl font-medium text-center mb-6 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          Latest Updates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className={`transform transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
      
            >
              <CardBidMain
                image={item.image}
                alt={item.title}
                height="200px"
              />
              <div className="mt-2">
                <h6 className="font-medium mb-1 text-white">
                  {item.title}
                </h6>
                <p className="text-sm text-white/70 mb-1">
                  {item.description}
                </p>
                <span className="text-xs text-white/50">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNewsSection;
