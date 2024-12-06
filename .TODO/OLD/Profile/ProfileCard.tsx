import React from "react";

interface ProfileCardProps {
  address: string;
  ensName?: string;
  avatar?: string;
  balance: number;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  address,
  ensName,
  avatar,
  balance,
}) => {
  return (
    <div className="p-6 rounded-lg bg-white bg-opacity-5 backdrop-blur-lg">
      <div className="flex items-center mb-6">
        <div
          className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full overflow-hidden flex-shrink-0"
        >
          {avatar ? (
            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white font-semibold">🌟</span>
          )}
        </div>
        <div className="ml-4">
          <h6 className="text-lg font-semibold">
            {ensName || `${address.slice(0, 6)}...${address.slice(-4)}`}
          </h6>
          <p className="text-gray-400 text-sm">
            {balance.toFixed(4)} ETH
          </p>
        </div>
      </div>
      <button className="w-full bg-primary text-white py-3 px-6 rounded-full hover:bg-secondary transition-colors duration-300">
        Disconnect Wallet
      </button>
    </div>
  );
};