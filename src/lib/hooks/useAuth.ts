import { useCallback } from "react";
import {
  ConnectorNotFoundError,
  SwitchChainNotSupportedError,
  useAccount,
  useConnect,
  useDisconnect,
} from "wagmi";

const useAuth = () => {
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { address, isConnected } = useAccount();

  const login = useCallback(
    async (connectorID: string) => {
      const findConnector = connectors.find((c) => c.id === connectorID);
      if (!findConnector) {
        throw new Error("WalletConnectorNotFoundError");
      }

      try {
        const connected = await connectAsync({
          connector: findConnector,
          chainId: 1, // Mainnet
        });

        if (connected.chainId !== 1) {
          throw new Error("Unsupported Chain");
        }
        return connected;
      } catch (error) {
        if (error instanceof ConnectorNotFoundError) {
          throw new Error("WalletConnectorNotFoundError");
        }
        if (error instanceof SwitchChainNotSupportedError) {
          throw new Error("Unable to switch network. Please try it on your wallet");
        }
        throw error;
      }
    },
    [connectors, connectAsync]
  );

  const logout = useCallback(async () => {
    try {
      await disconnectAsync();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }, [disconnectAsync]);

  return { 
    logout, 
    login, 
    isConnected, 
    address 
  };
};

export default useAuth;
