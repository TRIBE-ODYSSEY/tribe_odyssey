import React from "react";

interface RaffleCardProps {
  id: string;
  title: string;
  description: string;
  endDate: Date;
  ticketPrice: number;
  totalTickets: number;
  soldTickets: number;
}

export const RaffleCard: React.FC<RaffleCardProps> = ({
  title,
  description,
  endDate,
  ticketPrice,
  totalTickets,
  soldTickets,
}) => {
  return (
    <div className="p-6 rounded-lg bg-white bg-opacity-5 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:bg-opacity-8">
      <h6 className="text-lg font-semibold mb-4">{title}</h6>
      <p className="text-gray-400 mb-6">{description}</p>
      <div className="flex justify-between items-center mb-6">
        <span className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-sm">
          {`${soldTickets}/${totalTickets} tickets`}
        </span>
        <span className="text-gray-400 text-sm">
          {`Ends: ${endDate.toLocaleDateString()}`}
        </span>
      </div>
      <button className="w-full bg-primary text-white py-3 px-6 rounded-full hover:bg-secondary transition-colors duration-300">
        Buy Ticket ({ticketPrice} ETH)
      </button>
    </div>
  );
};