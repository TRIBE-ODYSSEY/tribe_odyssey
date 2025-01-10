import { useCallback } from "react";
import {
  useConnect,
  useDisconnect,
  useChainId
} from "wagmi";

interface LoginError extends Error {
  name: string;
  message: string;
}

const useAuth = () => {
  const chainId = useChainId();
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const login = useCallback(
    async (connectorId: string) => {
      const connector = connectors.find((c) => c.id === connectorId);
      
      if (!connector) {
        throw new Error("WalletConnectorNotFoundError");
      }

      try {
        const result = await connectAsync({ 
          connector,
          chainId 
        });
        
        // In Wagmi v2, we check if the connected chain matches the expected chain
        if (result.chainId !== chainId) {
          throw new Error("Unsupported Chain");
        }

        return result;
      } catch (error) {
        const err = error as LoginError;
        
        // Handle specific error cases
        if (err.name === "ConnectorNotFoundError") {
          throw new Error("WalletConnectorNotFoundError");
        }
        if (err.name === "SwitchChainError") {
          throw new Error(
            "Unable to switch network. Please try it on your wallet"
          );
        }
        throw error;
      }
    },
    [connectors, connectAsync, chainId]
  );

  const logout = useCallback(async () => {
    try {
      await disconnectAsync();
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [disconnectAsync]);

  return { logout, login };
};

export default useAuth;
