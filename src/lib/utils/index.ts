import { getAddress, formatUnits, parseUnits } from 'viem'
import { formatNumber } from 'viem/utils'

const format = (value: number | string) => {
  return formatNumber(Number(value), {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    useGrouping: true,
  })
}

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: string): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function getEtherScanLink(
  data: string,
  type: "transaction" | "token" | "address"
): string {
  const prefix = `https://etherscan.io`

  switch (type) {
    case "transaction": {
      return `${prefix}/tx/${data}`
    }
    case "token": {
      return `${prefix}/token/${data}`
    }
    case "address":
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export function shortenBtcAddress(address: string, chars = 4): string {
  if (!address) {
    return ""
  }
  return `${address.substring(0, chars + 2)}...${address.substring(60 - chars)}`
}

// add 10%
export function calculateGasMargin(value: bigint): bigint {
  return (value * BigInt(11000)) / BigInt(10000)
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function toWei(ether: string, decimals = 18): bigint {
  return parseUnits(ether, decimals)
}

export function toEth(wei: bigint, decimals = 18): string {
  return formatUnits(wei, decimals)
}

export const getBigNumber = (value: string | number | bigint): bigint => {
  if (!value) {
    return BigInt(0)
  }
  if (typeof value === 'bigint') {
    return value
  }
  return BigInt(value)
}

export const currencyFormatter = (labelValue: number | string) => {
  let suffix = ''
  let unit = 1
  const abs = Math.abs(Number(labelValue))
  if (abs >= 1.0e9) {
    suffix = 'B'
    unit = 1.0e9
  } else if (abs >= 1.0e6) {
    suffix = 'M'
    unit = 1.0e6
  } else if (abs >= 1.0e3) {
    suffix = 'K'
    unit = 1.0e3
  }
  return `${format(Math.floor((abs / unit) * 100) / 100)}${suffix}`
}

export const formatter = (value: number | string, decimals = 2, suffixStr = '') => {
  let suffix = ''
  let unit = 1
  if (isNaN(parseFloat(String(value)))) {
    return null
  }
  const abs = Number(value) || 0

  if (abs >= 1.0e9) {
    suffix = 'B'
    unit = 1.0e9
  } else if (abs >= 1.0e6) {
    suffix = 'M'
    unit = 1.0e6
  } else if (abs >= 1.0e3) {
    suffix = 'K'
    unit = 1.0e3
  }

  return `${format(Math.floor((abs / unit) * Math.pow(10, decimals)) / Math.pow(10, decimals))}${suffix} ${suffixStr || ''}`
}

export { format }
