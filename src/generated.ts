import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from 'wagmi/codegen'

import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  { payable: true, type: 'fallback', stateMutability: 'payable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Multicall
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const multicallAbi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct Multicall2.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct Multicall2.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct Multicall2.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct Multicall2.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct Multicall2.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct Multicall2.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct Multicall2.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const multicallAddress = {
  1: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  11155111: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const multicallConfig = {
  address: multicallAddress,
  abi: multicallAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Staking
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const stakingAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'pid', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'JoinedMany',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'pid', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'JoinedOne',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'pid', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'LeftMany',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'pid', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'LeftOne',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'PoolStopped',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'lockDuration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'raffleAt',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'active', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'PoolUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'requestId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'randomWords',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'payment',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RndRequestFulfilled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'requestId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'numWords',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
    ],
    name: 'RndRequestSent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PERCENTS_DIVIDER',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'TRIBE_TOTAL_SUPPLY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'lockDuration', internalType: 'uint256', type: 'uint256' },
      { name: 'raffleAt', internalType: 'uint256', type: 'uint256' },
      { name: 'active', internalType: 'bool', type: 'bool' },
    ],
    name: 'addPool',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'currentPoolId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decideWinners',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'pid', internalType: 'uint256', type: 'uint256' }],
    name: 'exit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_tribe', internalType: 'address', type: 'address' }],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'joinMany',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'joinOne',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastRequestId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'leaveMany',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'leaveOne',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'linkAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'lockedAt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'owners',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'pid', internalType: 'uint256', type: 'uint256' }],
    name: 'poolInfo',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'bool', type: 'bool' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'pid', internalType: 'uint256', type: 'uint256' }],
    name: 'poolStakedNFTs',
    outputs: [{ name: 'ids', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_requestId', internalType: 'uint256', type: 'uint256' },
      { name: '_randomWords', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'rawFulfillRandomWords',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint32', type: 'uint32' },
      { name: 'gasLimit', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'requestRnds',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 's_request_ids',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 's_requests',
    outputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256' },
      { name: 'paid', internalType: 'uint256', type: 'uint256' },
      { name: 'fulfilled', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newAddress', internalType: 'address', type: 'address' }],
    name: 'setERC721',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'randomNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'maxNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'count', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'splitRandomNumber',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'stopPool',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tribeAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'lockDuration', internalType: 'uint256', type: 'uint256' },
      { name: 'raffleAt', internalType: 'uint256', type: 'uint256' },
      { name: 'active', internalType: 'bool', type: 'bool' },
    ],
    name: 'updatePool',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
    ],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'userInfo',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256' },
      { name: '_account', internalType: 'address', type: 'address' },
    ],
    name: 'userStakedNFTs',
    outputs: [{ name: 'ids', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawLink',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'wrapperAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const stakingAddress = {
  1: '0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F',
  11155111: '0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const stakingConfig = {
  address: stakingAddress,
  abi: stakingAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Tribe
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const tribeAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_ape', internalType: 'address', type: 'address' },
      { name: '_merkleRoot', internalType: 'bytes32', type: 'bytes32' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [],
    name: 'APE_START_ID',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'APE_SUPPLY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_SUPPLY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'apeAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'claimBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_numToMint', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'costForMint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'currentTokenId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'endClaim',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'endSale',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isClaimActive',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'isExists',
    outputs: [{ name: '', internalType: 'bool[]', type: 'bool[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isSaleActive',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'isWhiteList',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxCountPerTx',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'merkleRoot',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'numberOfTokens', internalType: 'uint256', type: 'uint256' },
      { name: 'merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'priceForPublic',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'priceForWhitelist',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'URI', internalType: 'string', type: 'string' }],
    name: 'setTokenBaseURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'startClaim',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'startSale',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const tribeAddress = {
  1: '0x77F649385cA963859693C3d3299D36dfC7324EB9',
  11155111: '0x8371D5E26A6E86beE233482F1D71C0c6c86972D1',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const tribeConfig = { address: tribeAddress, abi: tribeAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const readErc20 = /*#__PURE__*/ createReadContract({ abi: erc20Abi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const readErc20Name = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const readErc20TotalSupply = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const readErc20Decimals = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readErc20BalanceOf = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const readErc20Symbol = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const readErc20Allowance = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const writeErc20 = /*#__PURE__*/ createWriteContract({ abi: erc20Abi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const writeErc20Approve = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const writeErc20TransferFrom = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const writeErc20Transfer = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const simulateErc20 = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const simulateErc20Approve = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateErc20TransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const simulateErc20Transfer = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const watchErc20Event = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const watchErc20ApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20Abi,
  eventName: 'Approval',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const watchErc20TransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20Abi,
  eventName: 'Transfer',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multicallAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const readMulticall = /*#__PURE__*/ createReadContract({
  abi: multicallAbi,
  address: multicallAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"aggregate"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const readMulticallAggregate = /*#__PURE__*/ createReadContract({
  abi: multicallAbi,
  address: multicallAddress,
  functionName: 'aggregate',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"getBlockHash"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const readMulticallGetBlockHash = /*#__PURE__*/ createReadContract({
  abi: multicallAbi,
  address: multicallAddress,
  functionName: 'getBlockHash',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"getBlockNumber"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const readMulticallGetBlockNumber = /*#__PURE__*/ createReadContract({
  abi: multicallAbi,
  address: multicallAddress,
  functionName: 'getBlockNumber',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"getCurrentBlockCoinbase"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const readMulticallGetCurrentBlockCoinbase =
  /*#__PURE__*/ createReadContract({
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'getCurrentBlockCoinbase',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"getCurrentBlockDifficulty"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const readMulticallGetCurrentBlockDifficulty =
  /*#__PURE__*/ createReadContract({
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'getCurrentBlockDifficulty',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"getCurrentBlockGasLimit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const readMulticallGetCurrentBlockGasLimit =
  /*#__PURE__*/ createReadContract({
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'getCurrentBlockGasLimit',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"getCurrentBlockTimestamp"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const readMulticallGetCurrentBlockTimestamp =
  /*#__PURE__*/ createReadContract({
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'getCurrentBlockTimestamp',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"getEthBalance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const readMulticallGetEthBalance = /*#__PURE__*/ createReadContract({
  abi: multicallAbi,
  address: multicallAddress,
  functionName: 'getEthBalance',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"getLastBlockHash"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const readMulticallGetLastBlockHash = /*#__PURE__*/ createReadContract({
  abi: multicallAbi,
  address: multicallAddress,
  functionName: 'getLastBlockHash',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"tryAggregate"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const readMulticallTryAggregate = /*#__PURE__*/ createReadContract({
  abi: multicallAbi,
  address: multicallAddress,
  functionName: 'tryAggregate',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link multicallAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const writeMulticall = /*#__PURE__*/ createWriteContract({
  abi: multicallAbi,
  address: multicallAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"blockAndAggregate"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const writeMulticallBlockAndAggregate =
  /*#__PURE__*/ createWriteContract({
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"tryBlockAndAggregate"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const writeMulticallTryBlockAndAggregate =
  /*#__PURE__*/ createWriteContract({
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link multicallAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const simulateMulticall = /*#__PURE__*/ createSimulateContract({
  abi: multicallAbi,
  address: multicallAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"blockAndAggregate"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const simulateMulticallBlockAndAggregate =
  /*#__PURE__*/ createSimulateContract({
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"tryBlockAndAggregate"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const simulateMulticallTryBlockAndAggregate =
  /*#__PURE__*/ createSimulateContract({
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStaking = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"PERCENTS_DIVIDER"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingPercentsDivider = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'PERCENTS_DIVIDER',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"TRIBE_TOTAL_SUPPLY"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingTribeTotalSupply = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'TRIBE_TOTAL_SUPPLY',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"currentPoolId"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingCurrentPoolId = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'currentPoolId',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"decideWinners"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingDecideWinners = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'decideWinners',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"lastRequestId"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingLastRequestId = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'lastRequestId',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"linkAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingLinkAddress = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'linkAddress',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"lockedAt"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingLockedAt = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'lockedAt',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingOwner = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"ownerOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingOwnerOf = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"owners"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingOwners = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'owners',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingPaused = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"poolInfo"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingPoolInfo = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'poolInfo',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"poolStakedNFTs"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingPoolStakedNfTs = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'poolStakedNFTs',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingProxiableUuid = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'proxiableUUID',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"s_request_ids"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingSRequestIds = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 's_request_ids',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"s_requests"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingSRequests = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 's_requests',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"splitRandomNumber"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingSplitRandomNumber = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'splitRandomNumber',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"tribeAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingTribeAddress = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'tribeAddress',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"userInfo"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingUserInfo = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'userInfo',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"userStakedNFTs"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingUserStakedNfTs = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'userStakedNFTs',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"wrapperAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const readStakingWrapperAddress = /*#__PURE__*/ createReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'wrapperAddress',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const writeStaking = /*#__PURE__*/ createWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"addPool"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const writeStakingAddPool = /*#__PURE__*/ createWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'addPool',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"exit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const writeStakingExit = /*#__PURE__*/ createWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'exit',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const writeStakingInitialize = /*#__PURE__*/ createWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"joinMany"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const writeStakingJoinMany = /*#__PURE__*/ createWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'joinMany',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"joinOne"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const writeStakingJoinOne = /*#__PURE__*/ createWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'joinOne',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"leaveMany"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const writeStakingLeaveMany = /*#__PURE__*/ createWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'leaveMany',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"leaveOne"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const writeStakingLeaveOne = /*#__PURE__*/ createWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'leaveOne',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const writeStakingPause = /*#__PURE__*/ createWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"rawFulfillRandomWords"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const writeStakingRawFulfillRandomWords =
  /*#__PURE__*/ createWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'rawFulfillRandomWords',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const writeStakingRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"requestRnds"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const writeStakingRequestRnds = /*#__PURE__*/ createWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'requestRnds',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"setERC721"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const writeStakingSetErc721 = /*#__PURE__*/ createWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'setERC721',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"stopPool"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const writeStakingStopPool = /*#__PURE__*/ createWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'stopPool',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const writeStakingTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const writeStakingUnpause = /*#__PURE__*/ createWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"updatePool"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const writeStakingUpdatePool = /*#__PURE__*/ createWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'updatePool',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"upgradeTo"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const writeStakingUpgradeTo = /*#__PURE__*/ createWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'upgradeTo',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const writeStakingUpgradeToAndCall = /*#__PURE__*/ createWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'upgradeToAndCall',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"withdrawLink"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const writeStakingWithdrawLink = /*#__PURE__*/ createWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'withdrawLink',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const simulateStaking = /*#__PURE__*/ createSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"addPool"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const simulateStakingAddPool = /*#__PURE__*/ createSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'addPool',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"exit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const simulateStakingExit = /*#__PURE__*/ createSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'exit',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const simulateStakingInitialize = /*#__PURE__*/ createSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"joinMany"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const simulateStakingJoinMany = /*#__PURE__*/ createSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'joinMany',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"joinOne"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const simulateStakingJoinOne = /*#__PURE__*/ createSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'joinOne',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"leaveMany"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const simulateStakingLeaveMany = /*#__PURE__*/ createSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'leaveMany',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"leaveOne"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const simulateStakingLeaveOne = /*#__PURE__*/ createSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'leaveOne',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const simulateStakingPause = /*#__PURE__*/ createSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"rawFulfillRandomWords"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const simulateStakingRawFulfillRandomWords =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'rawFulfillRandomWords',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const simulateStakingRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"requestRnds"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const simulateStakingRequestRnds = /*#__PURE__*/ createSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'requestRnds',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"setERC721"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const simulateStakingSetErc721 = /*#__PURE__*/ createSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'setERC721',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"stopPool"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const simulateStakingStopPool = /*#__PURE__*/ createSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'stopPool',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const simulateStakingTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const simulateStakingUnpause = /*#__PURE__*/ createSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"updatePool"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const simulateStakingUpdatePool = /*#__PURE__*/ createSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'updatePool',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"upgradeTo"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const simulateStakingUpgradeTo = /*#__PURE__*/ createSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'upgradeTo',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const simulateStakingUpgradeToAndCall =
  /*#__PURE__*/ createSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"withdrawLink"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const simulateStakingWithdrawLink = /*#__PURE__*/ createSimulateContract(
  { abi: stakingAbi, address: stakingAddress, functionName: 'withdrawLink' },
)

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const watchStakingEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: stakingAbi,
  address: stakingAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"AdminChanged"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const watchStakingAdminChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'AdminChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"BeaconUpgraded"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const watchStakingBeaconUpgradedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'BeaconUpgraded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const watchStakingInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"JoinedMany"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const watchStakingJoinedManyEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'JoinedMany',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"JoinedOne"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const watchStakingJoinedOneEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'JoinedOne',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"LeftMany"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const watchStakingLeftManyEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: stakingAbi, address: stakingAddress, eventName: 'LeftMany' },
)

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"LeftOne"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const watchStakingLeftOneEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: stakingAbi,
  address: stakingAddress,
  eventName: 'LeftOne',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const watchStakingOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"Paused"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const watchStakingPausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: stakingAbi,
  address: stakingAddress,
  eventName: 'Paused',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"PoolStopped"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const watchStakingPoolStoppedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'PoolStopped',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"PoolUpdated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const watchStakingPoolUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'PoolUpdated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"RndRequestFulfilled"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const watchStakingRndRequestFulfilledEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'RndRequestFulfilled',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"RndRequestSent"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const watchStakingRndRequestSentEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'RndRequestSent',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"Unpaused"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const watchStakingUnpausedEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: stakingAbi, address: stakingAddress, eventName: 'Unpaused' },
)

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const watchStakingUpgradedEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: stakingAbi, address: stakingAddress, eventName: 'Upgraded' },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribe = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"APE_START_ID"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeApeStartId = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'APE_START_ID',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"APE_SUPPLY"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeApeSupply = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'APE_SUPPLY',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"MAX_SUPPLY"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeMaxSupply = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'MAX_SUPPLY',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"apeAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeApeAddress = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'apeAddress',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeBalanceOf = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"costForMint"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeCostForMint = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'costForMint',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"currentTokenId"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeCurrentTokenId = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'currentTokenId',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"getApproved"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeGetApproved = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"isClaimActive"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeIsClaimActive = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'isClaimActive',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"isExists"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeIsExists = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'isExists',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"isSaleActive"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeIsSaleActive = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'isSaleActive',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"isWhiteList"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeIsWhiteList = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'isWhiteList',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"maxCountPerTx"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeMaxCountPerTx = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'maxCountPerTx',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"merkleRoot"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeMerkleRoot = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'merkleRoot',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeName = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeOwner = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"ownerOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeOwnerOf = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"priceForPublic"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribePriceForPublic = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'priceForPublic',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"priceForWhitelist"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribePriceForWhitelist = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'priceForWhitelist',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeSymbol = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"tokenURI"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeTokenUri = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const readTribeTotalSupply = /*#__PURE__*/ createReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tribeAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const writeTribe = /*#__PURE__*/ createWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const writeTribeApprove = /*#__PURE__*/ createWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"claim"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const writeTribeClaim = /*#__PURE__*/ createWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'claim',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"claimBatch"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const writeTribeClaimBatch = /*#__PURE__*/ createWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'claimBatch',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"endClaim"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const writeTribeEndClaim = /*#__PURE__*/ createWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'endClaim',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"endSale"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const writeTribeEndSale = /*#__PURE__*/ createWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'endSale',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const writeTribeMint = /*#__PURE__*/ createWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const writeTribeRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const writeTribeSafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const writeTribeSetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"setTokenBaseURI"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const writeTribeSetTokenBaseUri = /*#__PURE__*/ createWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'setTokenBaseURI',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"startClaim"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const writeTribeStartClaim = /*#__PURE__*/ createWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'startClaim',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"startSale"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const writeTribeStartSale = /*#__PURE__*/ createWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'startSale',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const writeTribeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const writeTribeTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const writeTribeWithdraw = /*#__PURE__*/ createWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tribeAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const simulateTribe = /*#__PURE__*/ createSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const simulateTribeApprove = /*#__PURE__*/ createSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"claim"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const simulateTribeClaim = /*#__PURE__*/ createSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'claim',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"claimBatch"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const simulateTribeClaimBatch = /*#__PURE__*/ createSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'claimBatch',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"endClaim"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const simulateTribeEndClaim = /*#__PURE__*/ createSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'endClaim',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"endSale"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const simulateTribeEndSale = /*#__PURE__*/ createSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'endSale',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const simulateTribeMint = /*#__PURE__*/ createSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const simulateTribeRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const simulateTribeSafeTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const simulateTribeSetApprovalForAll =
  /*#__PURE__*/ createSimulateContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"setTokenBaseURI"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const simulateTribeSetTokenBaseUri =
  /*#__PURE__*/ createSimulateContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'setTokenBaseURI',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"startClaim"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const simulateTribeStartClaim = /*#__PURE__*/ createSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'startClaim',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"startSale"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const simulateTribeStartSale = /*#__PURE__*/ createSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'startSale',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const simulateTribeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const simulateTribeTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const simulateTribeWithdraw = /*#__PURE__*/ createSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tribeAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const watchTribeEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: tribeAbi,
  address: tribeAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tribeAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const watchTribeApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: tribeAbi,
  address: tribeAddress,
  eventName: 'Approval',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tribeAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const watchTribeApprovalForAllEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tribeAbi,
    address: tribeAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tribeAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const watchTribeOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tribeAbi,
    address: tribeAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tribeAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const watchTribeTransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: tribeAbi,
  address: tribeAddress,
  eventName: 'Transfer',
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multicallAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const useReadMulticall = /*#__PURE__*/ createUseReadContract({
  abi: multicallAbi,
  address: multicallAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"aggregate"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const useReadMulticallAggregate = /*#__PURE__*/ createUseReadContract({
  abi: multicallAbi,
  address: multicallAddress,
  functionName: 'aggregate',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"getBlockHash"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const useReadMulticallGetBlockHash = /*#__PURE__*/ createUseReadContract(
  {
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'getBlockHash',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"getBlockNumber"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const useReadMulticallGetBlockNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'getBlockNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"getCurrentBlockCoinbase"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const useReadMulticallGetCurrentBlockCoinbase =
  /*#__PURE__*/ createUseReadContract({
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'getCurrentBlockCoinbase',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"getCurrentBlockDifficulty"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const useReadMulticallGetCurrentBlockDifficulty =
  /*#__PURE__*/ createUseReadContract({
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'getCurrentBlockDifficulty',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"getCurrentBlockGasLimit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const useReadMulticallGetCurrentBlockGasLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'getCurrentBlockGasLimit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"getCurrentBlockTimestamp"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const useReadMulticallGetCurrentBlockTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'getCurrentBlockTimestamp',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"getEthBalance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const useReadMulticallGetEthBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'getEthBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"getLastBlockHash"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const useReadMulticallGetLastBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'getLastBlockHash',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"tryAggregate"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const useReadMulticallTryAggregate = /*#__PURE__*/ createUseReadContract(
  {
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'tryAggregate',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multicallAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const useWriteMulticall = /*#__PURE__*/ createUseWriteContract({
  abi: multicallAbi,
  address: multicallAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"blockAndAggregate"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const useWriteMulticallBlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"tryBlockAndAggregate"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const useWriteMulticallTryBlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multicallAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const useSimulateMulticall = /*#__PURE__*/ createUseSimulateContract({
  abi: multicallAbi,
  address: multicallAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"blockAndAggregate"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const useSimulateMulticallBlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"tryBlockAndAggregate"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821)
 */
export const useSimulateMulticallTryBlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: multicallAbi,
    address: multicallAddress,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStaking = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"PERCENTS_DIVIDER"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingPercentsDivider =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'PERCENTS_DIVIDER',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"TRIBE_TOTAL_SUPPLY"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingTribeTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'TRIBE_TOTAL_SUPPLY',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"currentPoolId"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingCurrentPoolId = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'currentPoolId',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"decideWinners"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingDecideWinners = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'decideWinners',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"lastRequestId"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingLastRequestId = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'lastRequestId',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"linkAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingLinkAddress = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'linkAddress',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"lockedAt"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingLockedAt = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'lockedAt',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingOwner = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"ownerOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"owners"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingOwners = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'owners',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingPaused = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"poolInfo"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingPoolInfo = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'poolInfo',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"poolStakedNFTs"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingPoolStakedNfTs = /*#__PURE__*/ createUseReadContract(
  { abi: stakingAbi, address: stakingAddress, functionName: 'poolStakedNFTs' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'proxiableUUID',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"s_request_ids"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingSRequestIds = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 's_request_ids',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"s_requests"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingSRequests = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 's_requests',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"splitRandomNumber"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingSplitRandomNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'splitRandomNumber',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"tribeAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingTribeAddress = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'tribeAddress',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"userInfo"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingUserInfo = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'userInfo',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"userStakedNFTs"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingUserStakedNfTs = /*#__PURE__*/ createUseReadContract(
  { abi: stakingAbi, address: stakingAddress, functionName: 'userStakedNFTs' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"wrapperAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingWrapperAddress = /*#__PURE__*/ createUseReadContract(
  { abi: stakingAbi, address: stakingAddress, functionName: 'wrapperAddress' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStaking = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"addPool"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStakingAddPool = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'addPool',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"exit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStakingExit = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'exit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStakingInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"joinMany"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStakingJoinMany = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'joinMany',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"joinOne"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStakingJoinOne = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'joinOne',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"leaveMany"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStakingLeaveMany = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'leaveMany',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"leaveOne"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStakingLeaveOne = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'leaveOne',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStakingPause = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"rawFulfillRandomWords"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStakingRawFulfillRandomWords =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'rawFulfillRandomWords',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStakingRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"requestRnds"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStakingRequestRnds = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'requestRnds',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"setERC721"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStakingSetErc721 = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'setERC721',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"stopPool"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStakingStopPool = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'stopPool',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStakingTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStakingUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"updatePool"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStakingUpdatePool = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'updatePool',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"upgradeTo"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStakingUpgradeTo = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'upgradeTo',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStakingUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"withdrawLink"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStakingWithdrawLink = /*#__PURE__*/ createUseWriteContract(
  { abi: stakingAbi, address: stakingAddress, functionName: 'withdrawLink' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStaking = /*#__PURE__*/ createUseSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"addPool"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStakingAddPool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'addPool',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"exit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStakingExit = /*#__PURE__*/ createUseSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'exit',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStakingInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"joinMany"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStakingJoinMany =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'joinMany',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"joinOne"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStakingJoinOne =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'joinOne',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"leaveMany"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStakingLeaveMany =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'leaveMany',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"leaveOne"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStakingLeaveOne =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'leaveOne',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStakingPause = /*#__PURE__*/ createUseSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"rawFulfillRandomWords"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStakingRawFulfillRandomWords =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'rawFulfillRandomWords',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStakingRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"requestRnds"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStakingRequestRnds =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'requestRnds',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"setERC721"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStakingSetErc721 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'setERC721',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"stopPool"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStakingStopPool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'stopPool',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStakingTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStakingUnpause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"updatePool"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStakingUpdatePool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'updatePool',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"upgradeTo"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStakingUpgradeTo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'upgradeTo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStakingUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"withdrawLink"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStakingWithdrawLink =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    address: stakingAddress,
    functionName: 'withdrawLink',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWatchStakingEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakingAbi,
  address: stakingAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"AdminChanged"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWatchStakingAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'AdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"BeaconUpgraded"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWatchStakingBeaconUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'BeaconUpgraded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWatchStakingInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"JoinedMany"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWatchStakingJoinedManyEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'JoinedMany',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"JoinedOne"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWatchStakingJoinedOneEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'JoinedOne',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"LeftMany"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWatchStakingLeftManyEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'LeftMany',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"LeftOne"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWatchStakingLeftOneEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'LeftOne',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWatchStakingOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"Paused"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWatchStakingPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"PoolStopped"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWatchStakingPoolStoppedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'PoolStopped',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"PoolUpdated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWatchStakingPoolUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'PoolUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"RndRequestFulfilled"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWatchStakingRndRequestFulfilledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'RndRequestFulfilled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"RndRequestSent"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWatchStakingRndRequestSentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'RndRequestSent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"Unpaused"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWatchStakingUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWatchStakingUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingAbi,
    address: stakingAddress,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribe = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"APE_START_ID"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeApeStartId = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'APE_START_ID',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"APE_SUPPLY"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeApeSupply = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'APE_SUPPLY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"MAX_SUPPLY"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeMaxSupply = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'MAX_SUPPLY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"apeAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeApeAddress = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'apeAddress',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"costForMint"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeCostForMint = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'costForMint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"currentTokenId"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeCurrentTokenId = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'currentTokenId',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"getApproved"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeGetApproved = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeIsApprovedForAll = /*#__PURE__*/ createUseReadContract(
  { abi: tribeAbi, address: tribeAddress, functionName: 'isApprovedForAll' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"isClaimActive"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeIsClaimActive = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'isClaimActive',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"isExists"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeIsExists = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'isExists',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"isSaleActive"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeIsSaleActive = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'isSaleActive',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"isWhiteList"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeIsWhiteList = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'isWhiteList',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"maxCountPerTx"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeMaxCountPerTx = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'maxCountPerTx',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"merkleRoot"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeMerkleRoot = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'merkleRoot',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeName = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeOwner = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"ownerOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"priceForPublic"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribePriceForPublic = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'priceForPublic',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"priceForWhitelist"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribePriceForWhitelist =
  /*#__PURE__*/ createUseReadContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'priceForWhitelist',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeSymbol = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"tokenURI"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useReadTribeTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWriteTribe = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWriteTribeApprove = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"claim"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWriteTribeClaim = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'claim',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"claimBatch"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWriteTribeClaimBatch = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'claimBatch',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"endClaim"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWriteTribeEndClaim = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'endClaim',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"endSale"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWriteTribeEndSale = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'endSale',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWriteTribeMint = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWriteTribeRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWriteTribeSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWriteTribeSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"setTokenBaseURI"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWriteTribeSetTokenBaseUri =
  /*#__PURE__*/ createUseWriteContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'setTokenBaseURI',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"startClaim"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWriteTribeStartClaim = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'startClaim',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"startSale"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWriteTribeStartSale = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'startSale',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWriteTribeTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWriteTribeTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWriteTribeWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useSimulateTribe = /*#__PURE__*/ createUseSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useSimulateTribeApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"claim"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useSimulateTribeClaim = /*#__PURE__*/ createUseSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'claim',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"claimBatch"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useSimulateTribeClaimBatch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'claimBatch',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"endClaim"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useSimulateTribeEndClaim = /*#__PURE__*/ createUseSimulateContract(
  { abi: tribeAbi, address: tribeAddress, functionName: 'endClaim' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"endSale"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useSimulateTribeEndSale = /*#__PURE__*/ createUseSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'endSale',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useSimulateTribeMint = /*#__PURE__*/ createUseSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useSimulateTribeRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useSimulateTribeSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useSimulateTribeSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"setTokenBaseURI"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useSimulateTribeSetTokenBaseUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'setTokenBaseURI',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"startClaim"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useSimulateTribeStartClaim =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'startClaim',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"startSale"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useSimulateTribeStartSale =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'startSale',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useSimulateTribeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useSimulateTribeTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tribeAbi,
    address: tribeAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useSimulateTribeWithdraw = /*#__PURE__*/ createUseSimulateContract(
  { abi: tribeAbi, address: tribeAddress, functionName: 'withdraw' },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tribeAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWatchTribeEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: tribeAbi,
  address: tribeAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tribeAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWatchTribeApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tribeAbi,
    address: tribeAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tribeAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWatchTribeApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tribeAbi,
    address: tribeAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tribeAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWatchTribeOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tribeAbi,
    address: tribeAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tribeAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x8371D5E26A6E86beE233482F1D71C0c6c86972D1)
 */
export const useWatchTribeTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tribeAbi,
    address: tribeAddress,
    eventName: 'Transfer',
  })
