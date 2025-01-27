import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@src/components/common/layout/PageLayout';
import { IMAGES } from '@src/assets/images';
import DonationStats from './components/DonationStats';
import QRCodeSection from './components/QRCodeSection';
import DonateHoodie from './components/DonateHoodie';

interface SectionProps {
  title: string;
  content: string | React.ReactNode;
}

const ContentSection: React.FC<SectionProps> = ({ title, content }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="mb-12"
  >
    <h2 className="text-4xl font-light mb-6 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-button-primary)] 
                   bg-clip-text text-transparent">
      {title}
    </h2>
    <div className="text-[var(--color-text-primary)] text-lg leading-relaxed max-w-3xl">
      {content}
    </div>
  </motion.div>
);

const ThreadsPage: React.FC = () => {
  useEffect(() => {
    document.title = "Threads | Tribe Odyssey";
  }, []);

  return (
    <PageLayout>
      <div className="relative z-10 space-y-24 pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-[1200px] mx-auto rounded-2xl overflow-hidden">
            <div className="relative">
              {/* Content */}
              <div className="relative z-10 p-8 pt-4">
                {/* Logo Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full max-w-3xl mx-auto mb-12"
                >
                  <img
                    src={IMAGES.threads.logo}
                    alt="Threads logo"
                    className="w-full h-auto object-contain"
                  />
                </motion.div>

                {/* Donation Stats */}
                <DonationStats />

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-2 gap-12 mt-16">
                  {/* Hoodie Image */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative h-[400px] md:h-[566px] max-w-[500px] mx-auto"
                  >
                    <img
                      src={IMAGES.threads.ThreadHoodieMain}
                      alt="Threads Hoodie"
                      className="w-full h-full object-contain filter drop-shadow-lg"
                    />
                  </motion.div>

                  {/* Donation Section */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col gap-6 pt-0 md:pt-8"
                  >
                    <h2 className="text-4xl font-light bg-gradient-to-b from-[rgba(255,0,8,0.3)] 
                                 to-[var(--color-button-primary)] bg-clip-text text-transparent">
                      DONATE FUNDS
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-[var(--color-secondary)] rounded-2xl border border-white/10 
                                   transition-all duration-300 hover:-translate-y-1.5
                                   hover:border-white/20 hover:shadow-xl">
                        <QRCodeSection address="givethreads.eth" />
                      </div>
                      <DonateHoodie amount="44.00" />
                    </div>

                    <h2 className="text-4xl font-light bg-gradient-to-b from-[rgba(255,0,8,0.3)] 
                                 to-[var(--color-button-primary)] bg-clip-text text-transparent mt-6">
                      SEND HOODIES
                    </h2>
                    <div className="h-28 bg-contain bg-no-repeat bg-center rounded-2xl border border-white/10 
                                 transition-all duration-300 hover:-translate-y-1.5
                                 hover:border-white/20 hover:shadow-xl"
                         style={{ backgroundImage: `url(${IMAGES.threads.sendHoodies})` }}
                    />
                  </motion.div>
                </div>

                {/* Mission & History Sections */}
                <div className="mt-24">
                  <ContentSection
                    title="Mission"
                    content="Our threads mission is to spread the warmth. WTF does that mean? It means for every $44 donated we are able to supply a hoodie to someone in need. This covers the cost of the hoodie, screen-printing and shipping."
                  />
                  
                  <ContentSection
                    title="History"
                    content={
                      <>
                        <p className="mb-4">How it started: the founders of TRIBE were willing to take a chance and donate the first 100 hoodies!!</p>
                        <p className="mb-4">What's next? Spreading awareness - this a true grassroots project: every mention, post, share and donation helps.</p>
                        <p>Also in works - get a hoodie, give a hoodie. For $88 you get a hoodie w/a bonus donor logo and hoodie is donated.</p>
                      </>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ThreadsPage; 