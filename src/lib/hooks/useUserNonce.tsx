import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import axios from "axios"

interface UseUserNonceProps {
  trigger?: number
}

interface NonceResponse {
  nonce: string
}

const useUserNonce = ({ trigger = 0 }: UseUserNonceProps = {}) => {
  const [nonce, setNonce] = useState<string | null>(null)
  const { address } = useAccount()

  useEffect(() => {
    const fetchNonce = async () => {
      if (!address) {
        setNonce(null)
        return
      }

      try {
        const response = await axios.get<NonceResponse>("/api/auth/nonce", {
          params: { address }
        })
        setNonce(response.data.nonce)
      } catch (error) {
        console.error("Failed to fetch nonce:", error)
        setNonce(null)
      }
    }

    fetchNonce()
  }, [address, trigger])

  return {
    nonce,
    isLoading: address && !nonce,
    error: !nonce && address ? new Error("Failed to fetch nonce") : null
  }
}

export default useUserNonce
