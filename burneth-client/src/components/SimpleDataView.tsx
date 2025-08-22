/** @format */

import { useQuery } from '@apollo/client'
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Alert,
  Button,
  Chip,
  Grid,
  Divider
} from '@mui/material'
import {
  LocalFireDepartment as FireIcon,
  Person as PersonIcon,
  Schedule as TimeIcon,
  ShowChart as AmountIcon,
  Link as LinkIcon,
  Refresh as RefreshIcon,
  Description as ContractIcon
} from '@mui/icons-material'
import { GET_TXS } from '../apollo'

function SimpleDataView() {
  const { loading, error, data, refetch } = useQuery(GET_TXS)

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            加载中...
          </Typography>
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">查询错误: {error.message}</Alert>
      </Container>
    )
  }

  const burnEvents = (data?.burneds || [])
    .slice()
    .sort((a: any, b: any) => b.blockTimestamp - a.blockTimestamp)

  const formatEthValue = (value: string) => {
    const num = parseFloat(value)
    return `${(num / 1e18).toFixed(6)} ETH`
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return {
      date: date.toLocaleDateString('zh-CN'),
      time: date.toLocaleTimeString('zh-CN')
    }
  }

  const handleRefresh = async () => {
    await refetch()
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FireIcon sx={{ mr: 2, fontSize: 32, color: '#ff6b35' }} />
          <Typography variant="h4" gutterBottom sx={{ mb: 0 }}>
            燃烧事件数据
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={loading}
          >
            刷新
          </Button>
          <Button
            variant="contained"
            startIcon={<ContractIcon />}
            component="a"
            href="https://sepolia.etherscan.io/address/0xEE84639018Cb7c29EA725FD2FA8e8c1EBba016Fb"
            target="_blank"
            rel="noopener noreferrer"
          >
            查看合约
          </Button>
        </Box>
      </Box>

      {burnEvents.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 6 }}>
          <CardContent>
            <FireIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              暂无燃烧事件
            </Typography>
            <Typography variant="body2" color="text.secondary">
              等待第一个燃烧事件的产生
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: 'grid', gap: 3 }}>
          {burnEvents.map((event: any, index: number) => {
            const timeInfo = formatTime(event.blockTimestamp)
            return (
              <Card
                key={event.id}
                sx={{
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 3
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FireIcon sx={{ mr: 1, color: '#ff6b35' }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        燃烧事件 #{index + 1}
                      </Typography>
                    </Box>
                    <Chip
                      label={`区块 ${event.blockNumber}`}
                      variant="outlined"
                      size="small"
                      sx={{ fontFamily: 'monospace' }}
                    />
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 2,
                          backgroundColor: '#f8f9fa',
                          borderRadius: 2
                        }}
                      >
                        <PersonIcon sx={{ mr: 2, color: '#6c757d' }} />
                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            发送方
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontFamily: 'monospace',
                              fontSize: '0.875rem',
                              fontWeight: 500
                            }}
                          >
                            {formatAddress(event.from)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 2,
                          backgroundColor: '#fff3cd',
                          borderRadius: 2
                        }}
                      >
                        <AmountIcon sx={{ mr: 2, color: '#856404' }} />
                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            燃烧数量
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 600, color: '#856404' }}
                          >
                            {formatEthValue(event.value)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 2,
                          backgroundColor: '#d1ecf1',
                          borderRadius: 2
                        }}
                      >
                        <TimeIcon sx={{ mr: 2, color: '#0c5460' }} />
                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            时间
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {timeInfo.date}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {timeInfo.time}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 2,
                          backgroundColor: '#f8f9fa',
                          borderRadius: 2
                        }}
                      >
                        <LinkIcon sx={{ mr: 2, color: '#6c757d' }} />
                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            交易哈希
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontFamily: 'monospace',
                              fontSize: '0.875rem',
                              fontWeight: 500
                            }}
                          >
                            {formatAddress(event.transactionHash)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      component="a"
                      href={`https://sepolia.etherscan.io/tx/${event.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      size="small"
                      startIcon={<LinkIcon />}
                    >
                      查看交易
                    </Button>
                    <Button
                      component="a"
                      href={`https://sepolia.etherscan.io/address/${event.from}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="text"
                      size="small"
                      startIcon={<PersonIcon />}
                    >
                      查看地址
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )
          })}
        </Box>
      )}
    </Container>
  )
}

export default SimpleDataView
