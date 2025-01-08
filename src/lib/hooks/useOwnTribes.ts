import { useEffect, useState } from "react"
import { useAccount } from 'wagmi'
import useRefresh from "./useRefresh"
import axios from "axios"

const useOwnTribes = (trigger: number) => {
  const [tribes, setTribes] = useState([])
  const [stakedTribes, setStakedTribes] = useState([])
  const { address } = useAccount()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetch = async () => {
      if (!address) return
      
      try {
        const response = await axios.get("/item", {
          params: {
            owner: address.toLowerCase(),
            limit: 1000,
          },
        })
        const items = (response?.data?.items || []).map((item: any) => ({
          ...item,
          id: `${item.contract}-${item.tokenId}`,
        }));
        setTribes(items.filter((item: any) => !item.is_staked));
        setStakedTribes(items.filter((item: any) => item.is_staked));
      } catch (error) {
        console.error(error)
      }
    }

    fetch()
  }, [slowRefresh, address, trigger])

  return { tribes, stakedTribes }
}

export default useOwnTribes
