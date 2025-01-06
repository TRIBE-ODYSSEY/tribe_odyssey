import { ethers, type Provider, type InterfaceAbi } from 'ethers'
import { getMulticallContract } from './contracts'

export interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (example: balanceOf)
  params?: unknown[] // Function params
}

interface MulticallOptions {
  requireSuccess?: boolean
}

const multicall = async (abi: InterfaceAbi, calls: Call[], provider?: Provider) => {
  try {
    const multi = getMulticallContract(provider)
    const itf = new ethers.Interface(abi)

    const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
    const { returnData } = await multi.aggregate(calldata)

    const res = returnData.map((call: string, i: number) => itf.decodeFunctionResult(calls[i].name, call))

    return res
  } catch (error) {
    throw new Error(error as string)
  }
}

/**
 * Multicall V2 uses the new "tryAggregate" function. It is different in 2 ways
 *
 * 1. If "requireSuccess" is false multicall will not bail out if one of the calls fails
 * 2. The return inclues a boolean whether the call was successful e.g. [wasSuccessfull, callResult]
 */
export const multicallv2 = async (
  abi: InterfaceAbi,
  calls: Call[],
  options: MulticallOptions = { requireSuccess: true },
  provider?: Provider
): Promise<unknown[]> => {
  const { requireSuccess } = options
  const multi = getMulticallContract(provider)
  const itf = new ethers.Interface(abi)

  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const returnData = await multi.tryAggregate(requireSuccess, calldata)
  const res = returnData.map((call: [boolean, string], i: number) => {
    const [result, data] = call
    return result ? itf.decodeFunctionResult(calls[i].name, data) : null
  })

  return res
}

export default multicall
