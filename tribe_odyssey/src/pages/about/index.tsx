import React, { FC, memo } from "react";

interface AboutPageProps {
  className?: string;
}

const AboutPage: FC<AboutPageProps> = memo(() => {
  return (
    <div className="flex flex-col items-center gap-[80px]">
      <div className="h-[80px]">
        <img 
          className="object-cover h-full" 
          src="/assets/logo.png" 
          alt="Tribe Logo"
        />
      </div>
      <div className=" text-center flex flex-col gap-[50px] max-w-[800px] mx-auto">
        <p className="font-bold">
          Tribe is the highly anticipated follow up project from the 0xApes
          team. A standalone collection of distinctive and collectable ape
          characters that live on the Ethereum Blockchain. Tribe is an entirely
          original collection that is based in an alternate dimension. Within
          this dimension exists a futuristic world, a harsh and barren wasteland
          ruled by a tech advanced ape civilization. They are tribal warriors
          born from conflict who have risen from the ashes of FUD and carry the
          scars and war paint of relentless battle! They are the
          interdimensional versions of the original 0xApes.
        </p>
      </div>
    </div>
  );
});

export default AboutPage;
