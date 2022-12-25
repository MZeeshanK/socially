import { Typography, useTheme } from '@mui/material';
import { URL } from '../constants';
import FlexBetween from '../styledComponents/FlexBetween';
import WidgetWrapper from '../styledComponents/WidgetWrapper';

const AdvertWidget = () => {
  const { palette } = useTheme();

  const dark = palette.neutral.dark,
    main = palette.neutral.main,
    medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        src={`${URL}/assets/info4.jpeg`}
        alt="advert"
        width="100%"
        height="auto"
        style={{ borderRadius: '.75rem', margin: '.75rem 0' }}
      />
      <FlexBetween>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>mikaCosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m=".5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is shining.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
