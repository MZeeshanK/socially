import { Box } from '@mui/material';
import Spinner from '../assets/Loading.gif';

const Loader = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <img src={Spinner} alt="Loading" />
    </Box>
  );
};

export default Loader;
