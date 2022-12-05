import Box from '@mui/material/Box';

const Instructions = ({ strInstructions }) => {
  const instructionsArray = strInstructions
    .split('.')
    .filter((instruction) => instruction !== '');

  return (
    <>
      <Box
        component="ul"
        sx={{
          padding: '10px',
          listStyle: 'circle',
          textAlign: 'justify'
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
