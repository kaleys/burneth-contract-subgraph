import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import client from './apollo';
import SimpleDataView from './components/SimpleDataView';
import SimpleContract from './components/SimpleContract';

const theme = createTheme({
  palette: {
    background: {
      default: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          minHeight: '100vh',
        },
      },
    },
  },
});

function App() {
  const [page, setPage] = useState<'data' | 'contract'>('data');

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        <AppBar 
          position="static" 
          sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          <Toolbar sx={{ py: 1 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                flexGrow: 1, 
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              🔥 BurnETH DApp
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                color="inherit" 
                onClick={() => setPage('data')}
                variant={page === 'data' ? 'contained' : 'text'}
                sx={{
                  borderRadius: '20px',
                  px: 3,
                  fontWeight: 600,
                  ...(page === 'data' && {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.3)',
                    }
                  })
                }}
              >
                📊 查看数据
              </Button>
              <Button 
                color="inherit" 
                onClick={() => setPage('contract')}
                variant={page === 'contract' ? 'contained' : 'text'}
                sx={{
                  borderRadius: '20px',
                  px: 3,
                  fontWeight: 600,
                  ...(page === 'contract' && {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.3)',
                    }
                  })
                }}
              >
                🔥 执行合约
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {page === 'data' ? <SimpleDataView /> : <SimpleContract />}
        
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;