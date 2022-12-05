import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Ingredients from './Ingredients';
import Instructions from './Instructions';

const ImageDropdown = ({
  ingredients,
  strInstructions
}) => {
  return (
    <div>
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
          <Typography sx={{ fontWeight: 'bold' }}>Ingredients</Typography>
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
          <Typography sx={{ fontWeight: 'bold' }}>Method</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: '0 40px' }}>
          {strInstructions && (
            <Instructions strInstructions={strInstructions} />
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ImageDropdown;
