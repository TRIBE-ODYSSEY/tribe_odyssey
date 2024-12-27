import { IMAGES } from '@assets/index';

const LatestNewsSection = () => {
  const newsItems = [
    {
      id: 1,
      title: 'New Partnership Announcement',
      description: 'Exciting collaboration with leading NFT platform...',
      image: IMAGES.odyssey.nft1,

      date: 'March 1, 2024',
      link: '#',
    },
    {
      id: 2,
      title: 'Community Update',
      description: 'Latest developments and upcoming features...',
      image: IMAGES.odyssey.nft2,
      date: 'February 28, 2024',
      link: '#',
    },
    {
      id: 3,
      title: 'Special Event Coming Soon',
      description: 'Get ready for an exclusive community event...',
      image: IMAGES.odyssey.nft3,
      date: 'February 25, 2024',
      link: '#',
    },
  ];

  return (
    <section className="g-center  ">
      <h2 className=" text-4xl">Latest Updates</h2>

      {newsItems.map((item) => (
        <section key={item.id}>
          <h6>{item.title}</h6>
          <p>{item.description}</p>
          <span>{item.date}</span>
        </section>
      ))}
    </section>
  );
};

export default LatestNewsSection;
