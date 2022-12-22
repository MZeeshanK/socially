import { Box, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FriendListWidget from '../components/widgets/FriendsListWidget';
import MyPostWidget from '../components/widgets/MyPostWidget';
import PostsWidget from '../components/widgets/PostsWidget';
import UserWidget from '../components/widgets/UserWidget';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

  const getUser = async () => {
    const { data } = await axios.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUser(data);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        p="2rem"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
