import { Box, Typography, useTheme } from '@mui/material';
import Friend from '../Friend';
import WidgetWrapper from '../styledComponents/WidgetWrapper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setFriends } from '../../state/state';

const FriendsListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);

  const getFriends = async () => {
    const { data } = await axios.get(`/api/users/${userId}/friends`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setFriends({ friends: data }));
  };

  const friends = useSelector((state) => state.user.friends);

  useEffect(() => {
    getFriends();
    // eslint-disable-next-line
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: '1.5rem' }}
      >
        Friends List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => {
          const { _id, firstName, lastName, occupation, picturePath } = friend;
          return (
            <Friend
              key={_id}
              friendId={_id}
              name={`${firstName} ${lastName}`}
              subtitle={occupation}
              userPicturePath={picturePath}
            />
          );
        })}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendsListWidget;
