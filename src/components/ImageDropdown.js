import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Ingredients from './Ingredients';
import Box from '@mui/material/Box';
import Instructions from './Instructions';

const ImageDropdown = ({ strMealThumb, ingredients, strMeal, strInstructions }) => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Image</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 0
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <img src={strMealThumb} alt={`An image of ${strMeal}`}></img>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          display: {
            xs: 'block',
            sm: 'block',
            md: 'none',
            lg: 'none',
            xl: 'none'
          }
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Ingredients</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {ingredients && <Ingredients ingredients={ingredients} />}
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          display: {
            xs: 'block',
            sm: 'block',
            md: 'none',
            lg: 'none',
            xl: 'none'
          }
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Method</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {strInstructions && <Instructions strInstructions={strInstructions} />}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ImageDropdown;
