import React from 'react';

interface Accomplishment {
  id: string;
  title: string;
  description: string;
}

const accomplishments: Accomplishment[] = [
  {
    id: 'ape-shop',
    title: 'Ape shop',
    description: 'Creation of our very own native marketplace where both Tribe and OxApes can be bought, sold, and traded on a secure and user-friendly platform with 0% fees'
  },
  {
    id: 'tribe-odyssey',
    title: 'Tribe Odyssey',
    description: 'Successful launch of the highly anticipated and entirely original follow up collection to 0xApes'
  },
  {
    id: 'ens-domains',
    title: 'ENS Domains',
    description: 'Tribe Odyssey has become part of the ENS takeover! Users who hold a Tribe Odyssey NFT, can now register a unique tribeodyssey.eth subdomain'
  },
  {
    id: 'wallpapers',
    title: 'Wallpapers',
    description: 'Introduction of the Wallpaper application where users are able to update and customize their personal phone and desktop wallpaper displays with their favorite Tribe apes!'
  },
  {
    id: 'irl-events',
    title: 'IRL Events',
    description: 'We\'ve held IRL event in Nashville where Tribe holders and family were able to network and socialise. We see this as an important element to reward holders and spread project awerness'
  },
  {
    id: 'tribe-alliance',
    title: 'Tribe Alliance',
    description: 'Successful creation and onboarding of celebrities through Tribe Odyssey celebrity network initiative'
  },
  {
    id: 'oxapes',
    title: '0xApes',
    description: 'Successful launch of a first of its kind and extremely popular BAYC expansion project in the NFT space'
  },
  {
    id: 'exodus',
    title: '19: The Exodus',
    description: 'Limited edition airdrop completed for select OG community members featuring exclusive comic book cover artwork'
  }
];

const AccomplishmentsSection: React.FC = () => {
  return (
    <section className="w-full bg-[var(--color-background)]">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-6">
              Accomplishments
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-4xl mx-auto">
              We build, We create, and We accomplish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {accomplishments.map((item) => (
              <div
                key={item.id}
                className="bg-[var(--color-overlay-dark)]/5 hover:bg-[var(--color-overlay-dark)]/10 
                         backdrop-blur-sm transition-all duration-300 p-6 rounded-xl 
                         border border-[var(--color-text-primary)]/10 
                         hover:border-[var(--color-text-primary)]/20"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src="/images/ToxicIconRed.png" 
                      alt="ToxicIconRed" 
                      className="w-6 h-6 text-[var(--color-text-primary)]"
                      loading="lazy"
                    />
                    <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccomplishmentsSection;
