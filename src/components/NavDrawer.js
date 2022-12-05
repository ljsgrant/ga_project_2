import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TakeoutDiningRoundedIcon from '@mui/icons-material/TakeoutDiningRounded';
import SoupKitchenRoundedIcon from '@mui/icons-material/SoupKitchenRounded';
import ScatterPlotRoundedIcon from '@mui/icons-material/ScatterPlotRounded';

import { Link } from 'react-router-dom';

const NavDrawer = ({ categories }) => (
  <Container disableGutters sx={{ height: 1, bgcolor: '#D7D7D7' }}>
    <Toolbar sx={{ bgcolor: '#D1D1D1' }} />
    <Divider />
    <List sx={{ p: 0 }}>
      <Link to={'/'}>
        <ListItem disablePadding sx={{ bgcolor: '#E4E4E4', p: '8px 0' }}>
          <ListItemButton>
            <ListItemIcon>
              <CottageRoundedIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText
              primary="HOME"
              sx={{ color: '#414141', fontSize: '18px' }}
            />
          </ListItemButton>
        </ListItem>
      </Link>
      <Divider />
      <Link to={'/search'}>
        <ListItem disablePadding sx={{ bgcolor: '#E4E4E4', p: '8px 0' }}>
          <ListItemButton>
            <ListItemIcon>
              <SearchRoundedIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="SEARCH PAGE" sx={{ color: '#414141' }} />
          </ListItemButton>
        </ListItem>
      </Link>
      <Divider />
      <Link to={'/categories'}>
        <ListItem disablePadding sx={{ bgcolor: '#E4E4E4', p: '8px 0' }}>
          <ListItemButton>
            <ListItemIcon>
              <TakeoutDiningRoundedIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="ALL CATEGORIES" sx={{ color: '#414141' }} />
          </ListItemButton>
        </ListItem>
      </Link>
    </List>
    <Divider />

    <div>
      <Accordion
        square
        disableGutters
        elevation={0}
        sx={{
          p: '8px 0',
          color: '#414141',
          bgcolor: '#E4E4E4',
          width: 1
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <SoupKitchenRoundedIcon
            fontSize="medium"
            sx={{ mr: '32px', color: 'rgba(0, 0, 0, 0.54)' }}
          />
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
                    <ListItemIcon>
                      <ScatterPlotRoundedIcon
                        fontSize="small"
                        sx={{ color: 'rgba(0, 0, 0, 0.3)' }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={category.strCategory}
                      sx={{
                        textTransform: 'uppercase',
                        color: '#505050',
                        ml: '-10px'
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
    <Divider />
  </Container>
);

export default NavDrawer;
