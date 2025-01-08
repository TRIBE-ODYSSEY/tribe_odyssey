import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ENSRegistrar
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const ensRegistrarAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_ens', internalType: 'address', type: 'address' },
      { name: '_tribe', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'label',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'DomainConfigured',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'label',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'DomainTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'label',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'DomainUnlisted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'label',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'subdomain',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'NewRegistration',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'label',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'oldOwner',
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
    name: 'OwnerChanged',
  },
  {
    type: 'function',
    inputs: [],
    name: 'TLD_NODE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'allowedToRegister',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'name', internalType: 'string', type: 'string' }],
    name: 'configureDomain',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: '_owner', internalType: 'address payable', type: 'address' },
    ],
    name: 'configureDomainFor',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ens',
    outputs: [{ name: '', internalType: 'contract ENS', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'label', internalType: 'bytes32', type: 'bytes32' }],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'label', internalType: 'bytes32', type: 'bytes32' },
      { name: 'subdomain', internalType: 'string', type: 'string' },
    ],
    name: 'query',
    outputs: [{ name: 'domain', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'label', internalType: 'bytes32', type: 'bytes32' },
      { name: 'subdomain', internalType: 'string', type: 'string' },
      { name: 'resolver', internalType: 'address', type: 'address' },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'registrar',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'registrarOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'resolver', internalType: 'address', type: 'address' },
    ],
    name: 'setResolver',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stop',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'stopped',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceID', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'newOwner', internalType: 'address payable', type: 'address' },
    ],
    name: 'transfer',
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
    inputs: [{ name: 'name', internalType: 'string', type: 'string' }],
    name: 'unlistDomain',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const ensRegistrarAddress = {
  1: '0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const ensRegistrarConfig = {
  address: ensRegistrarAddress,
  abi: ensRegistrarAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Multicall
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 */
export const multicallAddress = {
  1: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const stakingAddress = {
  1: '0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F',
  5: '0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const stakingConfig = {
  address: stakingAddress,
  abi: stakingAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Tribe
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const tribeAddress = {
  1: '0x77F649385cA963859693C3d3299D36dfC7324EB9',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const tribeConfig = { address: tribeAddress, abi: tribeAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ensRegistrarAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useReadEnsRegistrar = /*#__PURE__*/ createUseReadContract({
  abi: ensRegistrarAbi,
  address: ensRegistrarAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"TLD_NODE"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useReadEnsRegistrarTldNode = /*#__PURE__*/ createUseReadContract({
  abi: ensRegistrarAbi,
  address: ensRegistrarAddress,
  functionName: 'TLD_NODE',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"allowedToRegister"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useReadEnsRegistrarAllowedToRegister =
  /*#__PURE__*/ createUseReadContract({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    functionName: 'allowedToRegister',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"ens"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useReadEnsRegistrarEns = /*#__PURE__*/ createUseReadContract({
  abi: ensRegistrarAbi,
  address: ensRegistrarAddress,
  functionName: 'ens',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useReadEnsRegistrarOwner = /*#__PURE__*/ createUseReadContract({
  abi: ensRegistrarAbi,
  address: ensRegistrarAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"query"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useReadEnsRegistrarQuery = /*#__PURE__*/ createUseReadContract({
  abi: ensRegistrarAbi,
  address: ensRegistrarAddress,
  functionName: 'query',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"registrar"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useReadEnsRegistrarRegistrar = /*#__PURE__*/ createUseReadContract(
  {
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    functionName: 'registrar',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"registrarOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useReadEnsRegistrarRegistrarOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    functionName: 'registrarOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"stopped"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useReadEnsRegistrarStopped = /*#__PURE__*/ createUseReadContract({
  abi: ensRegistrarAbi,
  address: ensRegistrarAddress,
  functionName: 'stopped',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useReadEnsRegistrarSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ensRegistrarAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useWriteEnsRegistrar = /*#__PURE__*/ createUseWriteContract({
  abi: ensRegistrarAbi,
  address: ensRegistrarAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"configureDomain"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useWriteEnsRegistrarConfigureDomain =
  /*#__PURE__*/ createUseWriteContract({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    functionName: 'configureDomain',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"configureDomainFor"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useWriteEnsRegistrarConfigureDomainFor =
  /*#__PURE__*/ createUseWriteContract({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    functionName: 'configureDomainFor',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"register"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useWriteEnsRegistrarRegister =
  /*#__PURE__*/ createUseWriteContract({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    functionName: 'register',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"setResolver"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useWriteEnsRegistrarSetResolver =
  /*#__PURE__*/ createUseWriteContract({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    functionName: 'setResolver',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"stop"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useWriteEnsRegistrarStop = /*#__PURE__*/ createUseWriteContract({
  abi: ensRegistrarAbi,
  address: ensRegistrarAddress,
  functionName: 'stop',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useWriteEnsRegistrarTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useWriteEnsRegistrarTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"unlistDomain"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useWriteEnsRegistrarUnlistDomain =
  /*#__PURE__*/ createUseWriteContract({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    functionName: 'unlistDomain',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ensRegistrarAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useSimulateEnsRegistrar = /*#__PURE__*/ createUseSimulateContract({
  abi: ensRegistrarAbi,
  address: ensRegistrarAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"configureDomain"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useSimulateEnsRegistrarConfigureDomain =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    functionName: 'configureDomain',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"configureDomainFor"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useSimulateEnsRegistrarConfigureDomainFor =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    functionName: 'configureDomainFor',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"register"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useSimulateEnsRegistrarRegister =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    functionName: 'register',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"setResolver"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useSimulateEnsRegistrarSetResolver =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    functionName: 'setResolver',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"stop"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useSimulateEnsRegistrarStop =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    functionName: 'stop',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useSimulateEnsRegistrarTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useSimulateEnsRegistrarTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ensRegistrarAbi}__ and `functionName` set to `"unlistDomain"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useSimulateEnsRegistrarUnlistDomain =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    functionName: 'unlistDomain',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ensRegistrarAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useWatchEnsRegistrarEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ensRegistrarAbi}__ and `eventName` set to `"DomainConfigured"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useWatchEnsRegistrarDomainConfiguredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    eventName: 'DomainConfigured',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ensRegistrarAbi}__ and `eventName` set to `"DomainTransferred"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useWatchEnsRegistrarDomainTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    eventName: 'DomainTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ensRegistrarAbi}__ and `eventName` set to `"DomainUnlisted"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useWatchEnsRegistrarDomainUnlistedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    eventName: 'DomainUnlisted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ensRegistrarAbi}__ and `eventName` set to `"NewRegistration"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useWatchEnsRegistrarNewRegistrationEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    eventName: 'NewRegistration',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ensRegistrarAbi}__ and `eventName` set to `"OwnerChanged"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB)
 */
export const useWatchEnsRegistrarOwnerChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ensRegistrarAbi,
    address: ensRegistrarAddress,
    eventName: 'OwnerChanged',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multicallAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 */
export const useReadMulticall = /*#__PURE__*/ createUseReadContract({
  abi: multicallAbi,
  address: multicallAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"aggregate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 */
export const useReadMulticallAggregate = /*#__PURE__*/ createUseReadContract({
  abi: multicallAbi,
  address: multicallAddress,
  functionName: 'aggregate',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"getBlockHash"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 */
export const useWriteMulticall = /*#__PURE__*/ createUseWriteContract({
  abi: multicallAbi,
  address: multicallAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"blockAndAggregate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
 */
export const useSimulateMulticall = /*#__PURE__*/ createUseSimulateContract({
  abi: multicallAbi,
  address: multicallAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link multicallAbi}__ and `functionName` set to `"blockAndAggregate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xeefba1e63905ef1d7acba5a8513c70307c1ce441)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStaking = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  address: stakingAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"PERCENTS_DIVIDER"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingPoolStakedNfTs = /*#__PURE__*/ createUseReadContract(
  { abi: stakingAbi, address: stakingAddress, functionName: 'poolStakedNFTs' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingUserStakedNfTs = /*#__PURE__*/ createUseReadContract(
  { abi: stakingAbi, address: stakingAddress, functionName: 'userStakedNFTs' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"wrapperAddress"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useReadStakingWrapperAddress = /*#__PURE__*/ createUseReadContract(
  { abi: stakingAbi, address: stakingAddress, functionName: 'wrapperAddress' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStaking = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  address: stakingAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"addPool"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWriteStakingWithdrawLink = /*#__PURE__*/ createUseWriteContract(
  { abi: stakingAbi, address: stakingAddress, functionName: 'withdrawLink' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useSimulateStaking = /*#__PURE__*/ createUseSimulateContract({
  abi: stakingAbi,
  address: stakingAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"addPool"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
 */
export const useWatchStakingEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: stakingAbi,
  address: stakingAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingAbi}__ and `eventName` set to `"AdminChanged"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xbE93Aa1C070563DC9827eb7Dc65211dE28A822BB)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribe = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"APE_START_ID"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeApeStartId = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'APE_START_ID',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"APE_SUPPLY"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeApeSupply = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'APE_SUPPLY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"MAX_SUPPLY"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeMaxSupply = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'MAX_SUPPLY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"apeAddress"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeApeAddress = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'apeAddress',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"costForMint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeCostForMint = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'costForMint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"currentTokenId"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeCurrentTokenId = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'currentTokenId',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"getApproved"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeGetApproved = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeIsApprovedForAll = /*#__PURE__*/ createUseReadContract(
  { abi: tribeAbi, address: tribeAddress, functionName: 'isApprovedForAll' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"isClaimActive"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeIsClaimActive = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'isClaimActive',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"isExists"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeIsExists = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'isExists',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"isSaleActive"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeIsSaleActive = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'isSaleActive',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"isWhiteList"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeIsWhiteList = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'isWhiteList',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"maxCountPerTx"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeMaxCountPerTx = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'maxCountPerTx',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"merkleRoot"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeMerkleRoot = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'merkleRoot',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeName = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeOwner = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"ownerOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"priceForPublic"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribePriceForPublic = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'priceForPublic',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"priceForWhitelist"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeSymbol = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"tokenURI"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useReadTribeTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useWriteTribe = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useWriteTribeApprove = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"claim"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useWriteTribeClaim = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'claim',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"claimBatch"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useWriteTribeClaimBatch = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'claimBatch',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"endClaim"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useWriteTribeEndClaim = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'endClaim',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"endSale"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useWriteTribeEndSale = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'endSale',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useWriteTribeMint = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useWriteTribeStartClaim = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'startClaim',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"startSale"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useWriteTribeStartSale = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'startSale',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useWriteTribeTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useWriteTribeWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useSimulateTribe = /*#__PURE__*/ createUseSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useSimulateTribeApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"claim"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useSimulateTribeClaim = /*#__PURE__*/ createUseSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'claim',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"claimBatch"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useSimulateTribeEndClaim = /*#__PURE__*/ createUseSimulateContract(
  { abi: tribeAbi, address: tribeAddress, functionName: 'endClaim' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"endSale"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useSimulateTribeEndSale = /*#__PURE__*/ createUseSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'endSale',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useSimulateTribeMint = /*#__PURE__*/ createUseSimulateContract({
  abi: tribeAbi,
  address: tribeAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tribeAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useSimulateTribeWithdraw = /*#__PURE__*/ createUseSimulateContract(
  { abi: tribeAbi, address: tribeAddress, functionName: 'withdraw' },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tribeAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useWatchTribeEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: tribeAbi,
  address: tribeAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tribeAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x77F649385cA963859693C3d3299D36dfC7324EB9)
 */
export const useWatchTribeTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tribeAbi,
    address: tribeAddress,
    eventName: 'Transfer',
  })
