import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import axios from "axios"

interface UserStakedData {
  staked_count: number
  daily_points: number
  points: number
  staked_tokens: string[]
  // Add any other fields from your API response
}

interface UseUserStakedProps {
  trigger?: number
}

const useUserStaked = ({ trigger = 0 }: UseUserStakedProps = {}) => {
  const [userStaked, setUserStaked] = useState<UserStakedData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  
  const { address } = useAccount()

  useEffect(() => {
    const fetchUserStaked = async () => {
      if (!address) {
        setUserStaked(null)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await axios.get<UserStakedData>("/api/staking/userStaked", {
          params: { address: address.toLowerCase() }
        })
        
        setUserStaked(response.data)
      } catch (err) {
        console.error("Failed to fetch staking data:", err)
        setError(err instanceof Error ? err : new Error("Failed to fetch staking data"))
        setUserStaked(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserStaked()
  }, [address, trigger])

  return {
    userStaked,
    isLoading,
    error,
    refetch: () => {
      // Manual refetch function
      if (address) {
        setIsLoading(true)
      }
    }
  }
}

export default useUserStaked
