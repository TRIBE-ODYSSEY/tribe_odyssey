import React, { useState } from 'react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: 'what-is-nft',
    question: 'What is an NFT?',
    answer: 'NFTs (Non-Fungible Tokens) are unique digital assets that cannot be replicated. They are stored on a blockchain and can represent ownership of digital items like art, music, videos, and more. Each NFT has a unique identifier that proves its authenticity and ownership.'
  },
  {
    id: 'check-rarity',
    question: 'What are Bitcoin Ordinals?',
    answer: 'Bitcoin Ordinals are digital collectibles that have had data inscribed (written to) on individual satoshis on the Bitcoin blockchain. Each inscribed sat is one-of-a-kind and can be owned, collected, and traded like a non-fungible token (NFT).'
  },
  {
    id: 'tribe-benefits',
    question: 'What are the benefits of holding TRIBE NFT?',
    answer: 'TRIBE NFT holders receive exclusive benefits including access to community events, voting rights on project decisions, early access to new releases, special merchandise, and participation in our rewards program.'
  },
  {
    id: 'twitter-connect',
    question: 'How do I get connected with my TRIBE on X?',
    answer: 'You can connect with your TRIBE on X by following our official account and joining our community discussions. We regularly share updates, announcements, and engage with our holders through X.'
  },
  {
    id: 'tribe-difference',
    question: 'How is TRIBE different from other NFT projects?',
    answer: 'TRIBE stands out through our unique community-first approach, innovative utility features, high-quality artwork, and sustainable long-term vision. We focus on creating real value for our holders through continuous development and engagement.'
  },
  {
    id: 'total-supply',
    question: 'What is the total supply?',
    answer: 'Tribe was a claimed NFT with a limited mint window that followed it. As such there are only 9401 Tribe NFT in existence. The Mint window will NEVER be opened again, and no further tribe claims can be completed. The scarcity can not change.'
  },
  {
    id: 'how-to-buy',
    question: 'How do I buy Tribe NFT?',
    answer: 'You can buy a tribe NFT on our own marketplace (https://apeshop.tribeodyssey.com), or other third party marketplaces such as:Opensea, LooksRare, X2Y2'
  },
  {
    id: 'discord-join',
    question: 'How do I join TRIBE Discord server?',
    answer: 'You can join our Discord server by clicking the Discord link on our website or social media channels. Once joined, verify your account and follow the onboarding process to access all channels.'
  },
  {
    id: 'download-resolution',
    question: 'How do I download 4K resolution of my TRIBE?',
    answer: 'You can navigate the site, go to Assets, 4K Tribe, enter your asset number and hit download.'
  },
  {
    id: 'marketplace',
    question: 'Does TRIBE has its own marketplace?',
    answer: 'Yes, TRIBE has its own dedicated marketplace where you can buy, sell, and trade TRIBE NFTs with 0% fees. Our marketplace provides a secure and user-friendly platform for all transactions.'
  }
];

const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>('what-is-nft');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  const midPoint = Math.ceil(faqs.length / 2);
  const leftColumnFaqs = faqs.slice(0, midPoint);
  const rightColumnFaqs = faqs.slice(midPoint);

  const renderFaqColumn = (faqItems: FaqItem[]) => (
    <div className="space-y-4 flex-1">
      {faqItems.map((faq) => (
        <div
          key={faq.id}
          className="bg-[var(--color-overlay-dark)]/5 backdrop-blur-sm rounded-xl 
                   border border-[var(--color-text-primary)]/10 
                   hover:border-[var(--color-text-primary)]/20 overflow-hidden
                   transition-all duration-300"
        >
          <button
            className="w-full px-6 py-4 text-left flex items-center justify-between 
                     hover:bg-[var(--color-overlay-dark)]/10 transition-colors duration-300"
            onClick={() => toggleFaq(faq.id)}
            aria-expanded={openId === faq.id}
          >
            <span className="text-lg font-semibold text-[var(--color-text-primary)]">
              {faq.question}
            </span>
            <span className={`transform transition-transform duration-300 ${openId === faq.id ? 'rotate-45' : ''}`}>
              <svg
                className="w-5 h-5 text-[var(--color-text-muted)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </span>
          </button>
          {openId === faq.id && (
            <div className="px-6 pb-4">
              <p className="text-sm md:text-base leading-relaxed text-[var(--color-text-muted)]">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <section className="w-full bg-[var(--color-background)]">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] text-center mb-12">
            FAQ
          </h2>

          <div className="flex flex-col lg:flex-row gap-6">
            {renderFaqColumn(leftColumnFaqs)}
            {renderFaqColumn(rightColumnFaqs)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
