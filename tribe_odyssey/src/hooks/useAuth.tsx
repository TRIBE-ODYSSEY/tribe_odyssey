import { useCallback } from "react";
import {
  ConnectorNotFoundError,
  useConnect,
  useDisconnect,
} from "wagmi";

const useAuth = () => {
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const login = useCallback(
    async (connectorId: string) => {
      const findConnector = connectors.find((c) => c.id === connectorId);
      if (!findConnector) {
        throw new Error("WalletConnectorNotFoundError");
      }
      
      try {
        const result = await connectAsync({ connector: findConnector });
        return result;
      } catch (error) {
        if (error instanceof ConnectorNotFoundError) {
          throw new Error("WalletConnectorNotFoundError");
        }
        console.error('Connection error:', error);
        throw new Error("Failed to connect wallet");
      }
    },
    [connectors, connectAsync]
  );

  const logout = useCallback(async () => {
    try {
      await disconnectAsync();
    } catch (error) {
      console.error(error);
    }
  }, [disconnectAsync]);

  return { logout, login };
};

export default useAuth;
