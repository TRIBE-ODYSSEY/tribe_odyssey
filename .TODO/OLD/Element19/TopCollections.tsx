import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon, SortAscendingIcon } from "@heroicons/react/outline";
import CollectionSkeleton from "./CollectionSkeleton";
import CollectionStats from "./CollectionStats";
import CollectionDetails from "./CollectionDetails";

// Definicje kategorii i opcji sortowania
const categories = [
  "Comics",
  "Posters",
  "Artwork",
  "Collectibles",
  "Digital",
  "Physical",
];

const sortOptions = [
  "Price: Low to High",
  "Price: High to Low",
  "Latest",
  "Oldest",
];

// Interfejs dla zakresu cen
interface PriceRange {
  min: number;
  max: number;
}

export const TopCollections: React.FC = () => {
  // Stany komponentu
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 10 });
  const [activeCategory, setActiveCategory] = useState("Comics");
  const [sortBy, setSortBy] = useState("Latest");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Dane przykładowe - zastąp rzeczywistym pobieraniem danych
  const collections = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, index) => ({
        id: index + 1,
        image: "/images/shaman1.jpeg",
        title: "SHAMAN",
        creator: "Exodus 19",
        price: "1.5",
        priceUSD: "204.12",
        change: "-12.45",
        totalVolume: "1250.5",
        owners: 450,
        category: "Comics", // Dodano kategorię dla filtrów
      })),
    []
  );

  // Obsługa wyszukiwania
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Obsługa zmiany zakresu cen
  const handlePriceRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.split(",");
    if (value.length === 2) {
      setPriceRange({ min: parseFloat(value[0]), max: parseFloat(value[1]) });
    }
  };

  // Obsługa zmiany sortowania
  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  // Obsługa kliknięcia w kategorię
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  // Obsługa ładowania więcej elementów
  const handleLoadMore = async () => {
    setLoading(true);
    // Dodaj logikę ładowania więcej elementów tutaj
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Symulacja ładowania
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  // Filtracja kolekcji
  const filteredCollections = useMemo(() => {
    return collections.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.creator.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice =
        parseFloat(item.price) >= priceRange.min &&
        parseFloat(item.price) <= priceRange.max;
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesPrice && matchesCategory;
    });
  }, [collections, searchQuery, priceRange, activeCategory]);

  // Symulacja ładowania danych
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6 md:py-8 px-4">
      <div className="flex flex-col items-center gap-5">
        {/* Nagłówek */}
        <h1 className="font-montserrat font-medium text-gray-200 text-3xl md:text-4xl text-center mb-2">
          Top Collections
        </h1>

        {/* Statystyki Kolekcji */}
        <CollectionStats />

        {/* Szczegóły Kolekcji */}
        <CollectionDetails />

        {/* Wyszukiwanie i Filtry */}
        <div className="w-full flex flex-col md:flex-row items-center gap-3 mb-4 flex-wrap">
          {/* Pole Wyszukiwania */}
          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder="Search collections..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-gray-600"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          {/* Suwak Zakresu Cen */}
          <div className="w-full md:w-72">
            <p className="text-gray-400 mb-1">Price Range (ETH)</p>
            {/* Tailwind nie wspiera natywnie suwaków z dwoma uchwytami, więc używamy pojedynczego */}
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={`${priceRange.min},${priceRange.max}`}
              onChange={handlePriceRangeChange}
              className="w-full h-2 bg-red-600 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-gray-400 text-sm">
              <span>{priceRange.min}</span>
              <span>{priceRange.max}</span>
            </div>
          </div>

          {/* Select Sortowania */}
          <div className="w-full md:w-48 relative">
            <select
              value={sortBy}
              onChange={handleSortByChange}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-gray-600 appearance-none"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option} className="text-black">
                  {option}
                </option>
              ))}
            </select>
            <SortAscendingIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Przyciski Kategorii */}
        <div className="w-full flex gap-2 mb-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-full border ${
                activeCategory === category
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-400 border-gray-600"
              } hover:bg-red-600 hover:text-white transition-colors duration-300`}
            >
              <span className="font-montserrat font-semibold text-base whitespace-nowrap">
                {category}
              </span>
            </button>
          ))}
        </div>

        {/* Siatka Kolekcji */}
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {isLoading
              ? // Pokazuj skeletony podczas ładowania
                Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="bg-gray-800 rounded-lg p-4"
                  >
                    <CollectionSkeleton />
                  </div>
                ))
              : // Pokazuj rzeczywiste elementy
                filteredCollections.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div
                      onClick={() => navigate(`/drops/${item.id}`)}
                      className="cursor-pointer bg-gray-800 rounded-lg border border-gray-700 transition-transform transform hover:-translate-y-1 hover:border-gray-600"
                    >
                      {/* Media Kolekcji */}
                      <div
                        className="h-56 bg-cover bg-center rounded-t-lg"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>

                      {/* Zawartość Kolekcji */}
                      <div className="p-4">
                        <h5 className="font-montserrat font-semibold text-gray-200 text-xl">
                          {item.title}
                        </h5>
                        <p className="font-montserrat text-gray-400">{item.creator}</p>
                      </div>

                      {/* Akcje Kolekcji */}
                      <div className="flex justify-between px-4 pb-4">
                        <div>
                          <p className="font-montserrat font-semibold text-gray-200 text-lg">
                            {item.price} ETH
                          </p>
                          <p className="font-montserrat text-gray-400 text-sm">Floor Price</p>
                        </div>
                        <div className="text-right">
                          <p className="font-montserrat font-semibold text-gray-200 text-lg">
                            ${item.priceUSD}
                          </p>
                          <p
                            className={`font-montserrat text-sm ${
                              parseFloat(item.change) < 0
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {item.change}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </div>
        </AnimatePresence>

        {/* Komunikat Braku Wyników */}
        {filteredCollections.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-lg">No collections found matching your criteria</p>
          </div>
        )}

        {/* Przyciski Ładowania Więcej */}
        {filteredCollections.length > 0 && (
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className={`mt-6 px-6 py-3 bg-gray-200 text-gray-800 rounded-full flex items-center justify-center transition-colors duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
          >
            <span className="font-inter text-base">
              {loading ? "Loading..." : "See more"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};