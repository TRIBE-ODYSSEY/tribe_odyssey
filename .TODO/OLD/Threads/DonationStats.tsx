import { FC } from "react";
import { useDonation } from "@contexts/DonationContext";

interface Stat {
  label: string;
  value: string | number;
  color: string;
}

export const DonationStats: FC = () => {
  const { totalDonations, hoodiesProvided } = useDonation();

  const stats: Stat[] = [
    {
      label: "Total Donations",
      value: `$${totalDonations.toFixed(2)}`,
      color: "#4CAF50",
    },
    {
      label: "Hoodies Provided",
      value: hoodiesProvided,
      color: "#ff0008",
    },
    {
      label: "Impact Made",
      value: `${(hoodiesProvided * 100).toLocaleString()} lives warmed`,
      color: "#2196F3",
    },
  ];

  return (
    <div className="w-full mb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="w-full animate-fadeInUp" style={{ animationDelay: `${index * 0.2}s` }}>
            <div
              className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 text-center transition-transform duration-300 ease hover:-translate-y-1 hover:border-opacity-20"
              style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <h4
                className="text-2xl font-semibold mb-4"
                style={{ color: stat.color }}
              >
                {stat.value}
              </h4>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};