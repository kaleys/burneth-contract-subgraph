/** @format */

export const CONTRACT_ADDRESS = '0xEE84639018Cb7c29EA725FD2FA8e8c1EBba016Fb'

// 通用的燃烧代币合约 ABI
export const CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Burned',
    type: 'event'
  },
  {
    inputs: [],
    name: 'burn',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  }
]
