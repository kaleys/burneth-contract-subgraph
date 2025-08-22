/** @format */

import React, { useState } from 'react'
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Alert,
  Box,
  TextField
} from '@mui/material'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contract/config'

declare global {
  interface Window {
    ethereum?: any
  }
}

function SimpleContract() {
  const [account, setAccount] = useState('')
  const [burnAmount, setBurnAmount] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const connectWallet = async () => {
    if (!window.ethereum) {
      setMessage('请安装 MetaMask')
      return
    }

    try {
      // 切换到 Sepolia
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }]
      })

      const account = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      // console.log(a)
      // return false
      // const provider = new ethers.providers.Web3Provider(window.ethereum)
      // const signer = provider.getSigner()
      // const address = await signer.getAddress()
      setAccount(account[0])
      setMessage('钱包已连接到 Sepolia')
    } catch (error: any) {
      setMessage('连接失败: ' + error.message)
    }
  }

  const burnTokens = async () => {
    if (!account || !burnAmount) {
      setMessage('请先连接钱包并输入燃烧数量')
      return
    }

    setLoading(true)
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      )

      // 将燃烧数量转换为 wei，作为 msg.value 发送
      const valueInWei = ethers.utils.parseEther(burnAmount)

      // 调用 burn 函数，通过 msg.value 传递燃烧数量
      const tx = await contract.burn({ value: valueInWei })
      setMessage(`✅ 交易发送成功！燃烧 ${burnAmount} ETH，哈希: ${tx.hash}`)

      // 等待确认
      await tx.wait()
      setMessage(`✅ 燃烧完成！成功燃烧 ${burnAmount} ETH 的代币`)
      setBurnAmount('')
    } catch (error: any) {
      console.error('错误:', error)

      if (error.code === 4001) {
        setMessage('❌ 您取消了交易')
      } else if (error.message.includes('execution reverted')) {
        setMessage('❌ 合约执行失败！可能是 ETH 余额不足或合约限制')
      } else if (error.message.includes('insufficient funds')) {
        setMessage('❌ ETH 余额不足支付交易和燃烧数量')
      } else {
        setMessage(`❌ 错误: ${error.message}`)
      }
    }
    setLoading(false)
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* 页面标题 */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          🔥 代币燃烧器
        </Typography>
        <Typography variant="h6" color="text.secondary">
          安全 • 简单 • 快速
        </Typography>
      </Box>

      {/* 钱包连接卡片 */}
      <Card
        sx={{
          mb: 3,
          background: account
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}
      >
        <CardContent sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            💼 钱包状态
          </Typography>
          {account ? (
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                ✅ 已连接
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'monospace',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  display: 'inline-block'
                }}
              >
                {account.slice(0, 6)}...{account.slice(-4)}
              </Typography>
            </Box>
          ) : (
            <Button
              variant="contained"
              onClick={connectWallet}
              size="large"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 600,
                py: 1.5,
                px: 4,
                borderRadius: '25px',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.3)'
                }
              }}
            >
              🦊 连接 MetaMask
            </Button>
          )}
        </CardContent>
      </Card>

      {/* 燃烧操作卡片 */}
      {account && (
        <Card
          sx={{
            background:
              'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
            boxShadow: '0 8px 32px rgba(255,154,158,0.3)'
          }}
        >
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 600, color: '#d63031' }}
            >
              🔥 燃烧代币
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, maxWidth: '400px', mx: 'auto' }}
            >
              输入要燃烧的 ETH 数量，合约会相应燃烧代币。操作会通过 MetaMask
              进行确认。
            </Typography>

            <Box sx={{ maxWidth: '300px', mx: 'auto', mb: 3 }}>
              <TextField
                label="燃烧数量 (ETH)"
                value={burnAmount}
                onChange={(e) => setBurnAmount(e.target.value)}
                fullWidth
                type="number"
                inputProps={{
                  step: '0.001',
                  min: '0'
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '15px',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.9)'
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'white'
                    }
                  }
                }}
                helperText="例如: 0.001 ETH"
              />
            </Box>

            <Button
              variant="contained"
              color="error"
              onClick={burnTokens}
              disabled={loading || !burnAmount || parseFloat(burnAmount) <= 0}
              size="large"
              sx={{
                py: 2,
                px: 6,
                borderRadius: '25px',
                fontWeight: 600,
                fontSize: '1.1rem',
                boxShadow: '0 4px 15px rgba(214, 48, 49, 0.4)',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(214, 48, 49, 0.6)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? '🔄 处理中...' : `🔥 燃烧 ${burnAmount || '?'} ETH`}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 消息提示 */}
      {message && (
        <Alert
          severity={
            message.includes('✅')
              ? 'success'
              : message.includes('❌')
              ? 'error'
              : 'info'
          }
          sx={{
            mt: 3,
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            '& .MuiAlert-message': {
              fontSize: '1rem'
            }
          }}
        >
          {message}
        </Alert>
      )}

      {/* 底部信息 */}
      <Box sx={{ textAlign: 'center', mt: 4, opacity: 0.7 }}>
        <Typography variant="body2" color="text.secondary">
          合约地址: {CONTRACT_ADDRESS.slice(0, 10)}...
          {CONTRACT_ADDRESS.slice(-8)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          网络: Sepolia 测试网
        </Typography>
      </Box>
    </Container>
  )
}

export default SimpleContract
