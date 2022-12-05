import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import RamenDiningRoundedIcon from '@mui/icons-material/RamenDiningRounded';

import { useState } from 'react';

import NavDrawer from './NavDrawer';

const drawerWidth = 240;

const Navigation = ({ window, categories, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { xl: `calc(100% - ${drawerWidth}px)` },
          ml: { xl: `${drawerWidth}px` },
          bgcolor: '#C17171'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xl: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="div" noWrap sx={{ mr: '22px' }}>
            <RamenDiningRoundedIcon fontSize="large" />
          </Typography>
          <Typography variant="h6" noWrap>
            RECIPE FINDER
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { xl: drawerWidth },
          flexShrink: { xl: 0 }
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', xl: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {<NavDrawer categories={categories} />}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', xl: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
          open
        >
          {<NavDrawer categories={categories} />}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xl: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          bgcolor: '#F4F4F4'
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Navigation;
