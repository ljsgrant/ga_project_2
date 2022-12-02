import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Instructions = ({ strInstructions }) => {
  const instructionsArray = strInstructions.split('.');

  console.log(instructionsArray);

  return (
    <>
      <Box
        component="ul"
        sx={{
          padding: '10px',
          listStyle: 'circle',
          textAlign: 'justify'
          // display: 'grid',
          // gap: '30px',
          // gridTemplateColumns: 'repeat(2, 1fr)'
        }}
      >
        {instructionsArray.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </Box>
    </>
  );
};

export default Instructions;
