import { useState } from 'react'
import { type Hash, type Address } from 'viem'
import { writeContract } from '../actions/contracts'

interface UseContractWriteProps {
  address: Address
  functionName: string
}

export function useContractWrite({ address, functionName }: UseContractWriteProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [hash, setHash] = useState<Hash | null>(null)

  const write = async (...args: unknown[]) => {
    try {
      setIsLoading(true)
      setError(null)
      const txHash = await writeContract(address, functionName, args)
      setHash(txHash)
      return txHash
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    write,
    isLoading,
    error,
    hash,
  }
}