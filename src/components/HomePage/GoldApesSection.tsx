import { IMAGES } from '@assets/index';
import Card from '@src/components/common/card/Card';
import { useMemo, useState } from 'react';

const GoldApesSection = () => {
  const goldApes = useMemo(
    () => Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      image: IMAGES.goldApes[i],
      alt: `Gold Ape ${i + 1}`
    })),
    []
  );

  const [currentIndex, setCurrentIndex] = useState(2);

  const displayIndices = useMemo(() => {
    const indices = [];
    for (let i = -2; i <= 2; i++) {
      let index = currentIndex + i;
      if (index < 0) index = goldApes.length + index;
      if (index >= goldApes.length) index = index - goldApes.length;
      indices.push(index);
    }
    return indices;
  }, [currentIndex, goldApes.length]);

  const getImageStyles = (position: number) => ({
    container: `transition-all duration-300 cursor-pointer ${
      position === 2 
        ? 'w-64 h-64 md:w-80 md:h-80 z-10 scale-110' 
        : position === 1 || position === 3 
          ? 'w-48 h-48 md:w-64 md:h-64 z-0 opacity-90 hover:opacity-100' 
          : 'w-40 h-40 md:w-56 md:h-56 z-0 opacity-80 hover:opacity-100'
    }`,
    card: position === 2 ? 'rounded-3xl shadow-2xl ring-2 ring-yellow-400/50' : 'rounded-3xl shadow-2xl'
  });

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white/80 mb-6">
            24 Carats Apes
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            They sit now perched upon decaying thrones, their exquisite 24 Carat fur shines vibrantly still like royal armour piercing the
            shadows of the world that once was. Unwavering in their belief they are Gods amongst apes. Their thirst to rule is relentless.
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 md:gap-6">
          {displayIndices.map((index, i) => {
            const styles = getImageStyles(i);
            return (
              <div
                key={goldApes[index].id}
                className={styles.container}
                onClick={() => setCurrentIndex(index)}
              >
                <Card
                  image={{
                    'data-src': goldApes[index].image,
                    alt: goldApes[index].alt,
                  }}
                  className={styles.card}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GoldApesSection;
