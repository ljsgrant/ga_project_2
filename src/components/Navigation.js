import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;

const ResponsiveDrawer = ({ window, categories, children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Toolbar />
      <Divider />
      <List>
        <Link to={'/'}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="HOME" sx={{ color: '#414141' }} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider sx={{ m: '8px 0' }} />
        <Link to={'/search'}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="SEARCH PAGE" sx={{ color: '#414141' }} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider sx={{ m: '8px 0' }} />
        <Link to={'/categories'}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                primary="ALL CATEGORIES"
                sx={{ color: '#414141' }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <div>
        <Accordion disableGutters elevation={0} sx={{ p: '8px 0' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            CATEGORIES
          </AccordionSummary>
          <AccordionDetails sx={{ marginTop: '-20px' }}>
            <List>
              {categories.map((category) => (
                <Link
                  to={`/categories/${category.strCategory}`}
                  key={category.strCategory}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary={category.strCategory}
                        sx={{
                          textTransform: 'uppercase',
                          color: '#8F4B4B'
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
        <Divider />
      </div>
    </>
  );

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
          backgroundColor: '#C17171'
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
          <Typography variant="h6" noWrap>
            RECIPE FINDER
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { xl: drawerWidth }, flexShrink: { xl: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
          {drawer}
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
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xl: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: '#F4F4F4'
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

export default ResponsiveDrawer;
