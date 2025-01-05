import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'staking',
      address: '0x220224422F2C2A9781F3EB5A0aA36F661DA9aA8F',
      abi: [
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "ids",
              "type": "uint256[]"
            }
          ],
          "name": "JoinedMany",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "name": "JoinedOne",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "ids",
              "type": "uint256[]"
            }
          ],
          "name": "LeftMany",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "name": "LeftOne",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "Paused",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "name": "PoolStopped",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "lockDuration",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "raffleAt",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "active",
              "type": "bool"
            }
          ],
          "name": "PoolUpdated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "requestId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "randomWords",
              "type": "uint256[]"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "payment",
              "type": "uint256"
            }
          ],
          "name": "RndRequestFulfilled",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "requestId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint32",
              "name": "numWords",
              "type": "uint32"
            }
          ],
          "name": "RndRequestSent",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "Unpaused",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "PERCENTS_DIVIDER",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "TRIBE_TOTAL_SUPPLY",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "lockDuration", "type": "uint256" },
            { "internalType": "uint256", "name": "raffleAt", "type": "uint256" },
            { "internalType": "bool", "name": "active", "type": "bool" }
          ],
          "name": "addPool",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "currentPoolId",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "pid", "type": "uint256" },
            { "internalType": "uint256", "name": "count", "type": "uint256" }
          ],
          "name": "decideWinners",
          "outputs": [
            { "internalType": "uint256[]", "name": "", "type": "uint256[]" }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{ "internalType": "uint256", "name": "pid", "type": "uint256" }],
          "name": "exit",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "_tribe", "type": "address" }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "pid", "type": "uint256" },
            { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }
          ],
          "name": "joinMany",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "pid", "type": "uint256" },
            { "internalType": "uint256", "name": "id", "type": "uint256" }
          ],
          "name": "joinOne",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "lastRequestId",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "pid", "type": "uint256" },
            { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }
          ],
          "name": "leaveMany",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "pid", "type": "uint256" },
            { "internalType": "uint256", "name": "id", "type": "uint256" }
          ],
          "name": "leaveOne",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "linkAddress",
          "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "name": "lockedAt",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }],
          "name": "ownerOf",
          "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "name": "owners",
          "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "pause",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "paused",
          "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{ "internalType": "uint256", "name": "pid", "type": "uint256" }],
          "name": "poolInfo",
          "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" },
            { "internalType": "uint256", "name": "", "type": "uint256" },
            { "internalType": "uint256", "name": "", "type": "uint256" },
            { "internalType": "bool", "name": "", "type": "bool" },
            { "internalType": "bool", "name": "", "type": "bool" },
            { "internalType": "uint256[]", "name": "", "type": "uint256[]" }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{ "internalType": "uint256", "name": "pid", "type": "uint256" }],
          "name": "poolStakedNFTs",
          "outputs": [
            { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "_requestId", "type": "uint256" },
            {
              "internalType": "uint256[]",
              "name": "_randomWords",
              "type": "uint256[]"
            }
          ],
          "name": "rawFulfillRandomWords",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "pid", "type": "uint256" },
            { "internalType": "uint32", "name": "count", "type": "uint32" },
            { "internalType": "uint32", "name": "gasLimit", "type": "uint32" }
          ],
          "name": "requestRnds",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" },
            { "internalType": "uint256", "name": "", "type": "uint256" }
          ],
          "name": "s_request_ids",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "name": "s_requests",
          "outputs": [
            { "internalType": "uint256", "name": "pid", "type": "uint256" },
            { "internalType": "uint256", "name": "paid", "type": "uint256" },
            { "internalType": "bool", "name": "fulfilled", "type": "bool" }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "newAddress", "type": "address" }
          ],
          "name": "setERC721",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "randomNumber", "type": "uint256" },
            { "internalType": "uint256", "name": "maxNumber", "type": "uint256" },
            { "internalType": "uint256", "name": "count", "type": "uint256" }
          ],
          "name": "splitRandomNumber",
          "outputs": [
            { "internalType": "uint256[]", "name": "", "type": "uint256[]" }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }],
          "name": "stopPool",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "newOwner", "type": "address" }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "tribeAddress",
          "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "unpause",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "id", "type": "uint256" },
            { "internalType": "uint256", "name": "lockDuration", "type": "uint256" },
            { "internalType": "uint256", "name": "raffleAt", "type": "uint256" },
            { "internalType": "bool", "name": "active", "type": "bool" }
          ],
          "name": "updatePool",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            { "internalType": "bytes", "name": "data", "type": "bytes" }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "pid", "type": "uint256" },
            { "internalType": "address", "name": "account", "type": "address" }
          ],
          "name": "userInfo",
          "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" },
            { "internalType": "uint256[]", "name": "", "type": "uint256[]" }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "pid", "type": "uint256" },
            { "internalType": "address", "name": "_account", "type": "address" }
          ],
          "name": "userStakedNFTs",
          "outputs": [
            { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "withdrawLink",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "wrapperAddress",
          "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
          "stateMutability": "view",
          "type": "function"
        },
        { "stateMutability": "payable", "type": "receive" }
      ]
    },
    {
      name: 'Tribe',
      address: '0x77F649385cA963859693C3d3299D36dfC7324EB9',
      abi: [
        {
          "inputs": [
            { "internalType": "address", "name": "_ape", "type": "address" },
            { "internalType": "bytes32", "name": "_merkleRoot", "type": "bytes32" }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "approved",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "ApprovalForAll",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "APE_START_ID",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "APE_SUPPLY",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "MAX_SUPPLY",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "apeAddress",
          "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
          ],
          "name": "approve",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "owner", "type": "address" }
          ],
          "name": "balanceOf",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
          ],
          "name": "claim",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }
          ],
          "name": "claimBatch",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "_numToMint", "type": "uint256" },
            { "internalType": "address", "name": "account", "type": "address" },
            {
              "internalType": "bytes32[]",
              "name": "merkleProof",
              "type": "bytes32[]"
            }
          ],
          "name": "costForMint",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "currentTokenId",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "endClaim",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "endSale",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
          ],
          "name": "getApproved",
          "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "owner", "type": "address" },
            { "internalType": "address", "name": "operator", "type": "address" }
          ],
          "name": "isApprovedForAll",
          "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "isClaimActive",
          "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }
          ],
          "name": "isExists",
          "outputs": [{ "internalType": "bool[]", "name": "", "type": "bool[]" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "isSaleActive",
          "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "account", "type": "address" },
            {
              "internalType": "bytes32[]",
              "name": "merkleProof",
              "type": "bytes32[]"
            }
          ],
          "name": "isWhiteList",
          "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "maxCountPerTx",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "merkleRoot",
          "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "numberOfTokens",
              "type": "uint256"
            },
            {
              "internalType": "bytes32[]",
              "name": "merkleProof",
              "type": "bytes32[]"
            }
          ],
          "name": "mint",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
          "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
          ],
          "name": "ownerOf",
          "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "priceForPublic",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "priceForWhitelist",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "from", "type": "address" },
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "from", "type": "address" },
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
            { "internalType": "bytes", "name": "_data", "type": "bytes" }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "operator", "type": "address" },
            { "internalType": "bool", "name": "approved", "type": "bool" }
          ],
          "name": "setApprovalForAll",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [{ "internalType": "string", "name": "URI", "type": "string" }],
          "name": "setTokenBaseURI",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "startClaim",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "startSale",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }
          ],
          "name": "supportsInterface",
          "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "symbol",
          "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
          ],
          "name": "tokenURI",
          "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalSupply",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "from", "type": "address" },
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
          ],
          "name": "transferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "address", "name": "newOwner", "type": "address" }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        { "stateMutability": "payable", "type": "receive" }
      ]
    },
    {
      name: 'Multicall',
      address: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
      abi: [
        {
          "inputs": [
            {
              "components": [
                { "internalType": "address", "name": "target", "type": "address" },
                { "internalType": "bytes", "name": "callData", "type": "bytes" }
              ],
              "internalType": "struct Multicall2.Call[]",
              "name": "calls",
              "type": "tuple[]"
            }
          ],
          "name": "aggregate",
          "outputs": [
            { "internalType": "uint256", "name": "blockNumber", "type": "uint256" },
            { "internalType": "bytes[]", "name": "returnData", "type": "bytes[]" }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                { "internalType": "address", "name": "target", "type": "address" },
                { "internalType": "bytes", "name": "callData", "type": "bytes" }
              ],
              "internalType": "struct Multicall2.Call[]",
              "name": "calls",
              "type": "tuple[]"
            }
          ],
          "name": "blockAndAggregate",
          "outputs": [
            { "internalType": "uint256", "name": "blockNumber", "type": "uint256" },
            { "internalType": "bytes32", "name": "blockHash", "type": "bytes32" },
            {
              "components": [
                { "internalType": "bool", "name": "success", "type": "bool" },
                { "internalType": "bytes", "name": "returnData", "type": "bytes" }
              ],
              "internalType": "struct Multicall2.Result[]",
              "name": "returnData",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [{ "internalType": "uint256", "name": "blockNumber", "type": "uint256" }],
          "name": "getBlockHash",
          "outputs": [{ "internalType": "bytes32", "name": "blockHash", "type": "bytes32" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getBlockNumber",
          "outputs": [{ "internalType": "uint256", "name": "blockNumber", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getCurrentBlockCoinbase",
          "outputs": [{ "internalType": "address", "name": "coinbase", "type": "address" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getCurrentBlockDifficulty",
          "outputs": [{ "internalType": "uint256", "name": "difficulty", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getCurrentBlockGasLimit",
          "outputs": [{ "internalType": "uint256", "name": "gaslimit", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getCurrentBlockTimestamp",
          "outputs": [{ "internalType": "uint256", "name": "timestamp", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{ "internalType": "address", "name": "addr", "type": "address" }],
          "name": "getEthBalance",
          "outputs": [{ "internalType": "uint256", "name": "balance", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getLastBlockHash",
          "outputs": [{ "internalType": "bytes32", "name": "blockHash", "type": "bytes32" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "bool", "name": "requireSuccess", "type": "bool" },
            {
              "components": [
                { "internalType": "address", "name": "target", "type": "address" },
                { "internalType": "bytes", "name": "callData", "type": "bytes" }
              ],
              "internalType": "struct Multicall2.Call[]",
              "name": "calls",
              "type": "tuple[]"
            }
          ],
          "name": "tryAggregate",
          "outputs": [
            {
              "components": [
                { "internalType": "bool", "name": "success", "type": "bool" },
                { "internalType": "bytes", "name": "returnData", "type": "bytes" }
              ],
              "internalType": "struct Multicall2.Result[]",
              "name": "returnData",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            { "internalType": "bool", "name": "requireSuccess", "type": "bool" },
            {
              "components": [
                { "internalType": "address", "name": "target", "type": "address" },
                { "internalType": "bytes", "name": "callData", "type": "bytes" }
              ],
              "internalType": "struct Multicall2.Call[]",
              "name": "calls",
              "type": "tuple[]"
            }
          ],
          "name": "tryBlockAndAggregate",
          "outputs": [
            { "internalType": "uint256", "name": "blockNumber", "type": "uint256" },
            { "internalType": "bytes32", "name": "blockHash", "type": "bytes32" },
            {
              "components": [
                { "internalType": "bool", "name": "success", "type": "bool" },
                { "internalType": "bytes", "name": "returnData", "type": "bytes" }
              ],
              "internalType": "struct Multicall2.Result[]",
              "name": "returnData",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
    },
    {
      name: 'ENSRegistrar',
      address: '0x6Bb87da9Ea7E1B636dBccB1b664239BC38a46fbB',
      abi: [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_ens",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_tribe",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "label",
              "type": "bytes32"
            }
          ],
          "name": "DomainConfigured",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "label",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "name",
              "type": "string"
            }
          ],
          "name": "DomainTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "label",
              "type": "bytes32"
            }
          ],
          "name": "DomainUnlisted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "label",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "subdomain",
              "type": "string"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            }
          ],
          "name": "NewRegistration",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "label",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "oldOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnerChanged",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "TLD_NODE",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "allowedToRegister",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            }
          ],
          "name": "configureDomain",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "address payable",
              "name": "_owner",
              "type": "address"
            }
          ],
          "name": "configureDomainFor",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "ens",
          "outputs": [
            {
              "internalType": "contract ENS",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "label",
              "type": "bytes32"
            }
          ],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "label",
              "type": "bytes32"
            },
            {
              "internalType": "string",
              "name": "subdomain",
              "type": "string"
            }
          ],
          "name": "query",
          "outputs": [
            {
              "internalType": "string",
              "name": "domain",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "label",
              "type": "bytes32"
            },
            {
              "internalType": "string",
              "name": "subdomain",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "resolver",
              "type": "address"
            }
          ],
          "name": "register",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "registrar",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "registrarOwner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "resolver",
              "type": "address"
            }
          ],
          "name": "setResolver",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "stop",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "stopped",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceID",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "address payable",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transfer",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            }
          ],
          "name": "unlistDomain",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
    },
    {
      name: 'Ape',
      address: '0x22c08c358f62f35b742d023bf2faf67e30e5376e',
      abi: [],
    },
  ],
  plugins: [react()],
})
