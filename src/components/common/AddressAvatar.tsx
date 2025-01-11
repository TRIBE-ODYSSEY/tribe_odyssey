import React, { useState } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { ZeroAddress } from 'ethers';

interface AddressAvatarProps {
  address: string;
  size?: number;
  className?: string;
}

const AddressAvatar: React.FC<AddressAvatarProps> = ({ 
  address, 
  size = 40,
  className = ''
}) => {
  const [hasError] = useState(false);

  if (hasError) {
    return (
      <div 
        className={`bg-gray-700 rounded-full flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-white text-xs">
          {address.slice(2, 4)}
        </span>
      </div>
    );
  }

  return (
    <div className={className}>
      <Jazzicon 
        diameter={size} 
        seed={jsNumberForAddress(address || ZeroAddress)} 
      />
    </div>
  );
};

export default AddressAvatar;