import React from "react";

interface ConnectWalletProps {
    onConnect: () => void;
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnect }) => {
    return (
        <button
            onClick={onConnect}
            className="bg-primary text-white px-4 py-1.5 rounded-full hover:bg-secondary transition-colors duration-300"
        >
            <span className="text-sm">Connect Wallet</span>
        </button>
    );
};