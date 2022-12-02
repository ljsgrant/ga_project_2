import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Instructions = ({ strInstructions }) => {
  const instructionsArray = strInstructions.split('.');

  console.log(instructionsArray);

  return (
    <>
      <h3>Method</h3>
      <ul>
        {instructionsArray.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
    </>
  );
};

export default Instructions;
